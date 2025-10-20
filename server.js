require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const nodemailer = require('nodemailer');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Inicializar banco de dados SQLite
const db = new sqlite3.Database('./agendamentos.db', (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conectado ao banco de dados SQLite');
    inicializarBancoDados();
  }
});

// Função para inicializar as tabelas
function inicializarBancoDados() {
  db.run(`
    CREATE TABLE IF NOT EXISTS agendamentos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      escola TEXT NOT NULL,
      email TEXT NOT NULL,
      telefone TEXT,
      data TEXT NOT NULL,
      horario TEXT NOT NULL,
      turmas TEXT,
      observacoes TEXT,
      criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS horarios_disponiveis (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      data TEXT NOT NULL,
      horario TEXT NOT NULL,
      disponivel INTEGER DEFAULT 1,
      UNIQUE(data, horario)
    )
  `);
}

// Configurar transporte de email
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Middleware de autenticação
function verificarToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ erro: 'Token não fornecido' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ erro: 'Token inválido' });
  }
}

// Rota de login
app.post('/api/login', (req, res) => {
  const { usuario, senha } = req.body;
  
  if (usuario === process.env.ADMIN_USER && senha === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign(
      { usuario: usuario, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({ sucesso: true, token });
  } else {
    res.status(401).json({ erro: 'Usuário ou senha inválidos' });
  }
});

// Rota para obter horários disponíveis
app.get('/api/horarios', (req, res) => {
  db.all('SELECT * FROM horarios_disponiveis WHERE disponivel = 1 ORDER BY data, horario', (err, rows) => {
    if (err) {
      res.status(500).json({ erro: 'Erro ao buscar horários' });
      return;
    }
    res.json(rows);
  });
});

// Rota para obter agendamentos
app.get('/api/agendamentos', (req, res) => {
  db.all('SELECT * FROM agendamentos ORDER BY data, horario DESC', (err, rows) => {
    if (err) {
      res.status(500).json({ erro: 'Erro ao buscar agendamentos' });
      return;
    }
    res.json(rows);
  });
});

// Rota para criar novo agendamento
app.post('/api/agendamentos', (req, res) => {
  const { escola, email, telefone, data, horario, turmas, observacoes } = req.body;

  // Validar dados
  if (!escola || !email || !data || !horario) {
    res.status(400).json({ erro: 'Dados obrigatórios faltando' });
    return;
  }

  // Verificar se o horário já está agendado
  db.get(
    'SELECT * FROM agendamentos WHERE data = ? AND horario = ?',
    [data, horario],
    (err, row) => {
      if (err) {
        res.status(500).json({ erro: 'Erro ao verificar disponibilidade' });
        return;
      }

      if (row) {
        res.status(400).json({ erro: 'Este horário já está agendado' });
        return;
      }

      // Inserir agendamento
      db.run(
        `INSERT INTO agendamentos (escola, email, telefone, data, horario, turmas, observacoes)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [escola, email, telefone, data, horario, turmas, observacoes],
        function (err) {
          if (err) {
            res.status(500).json({ erro: 'Erro ao criar agendamento' });
            return;
          }

          // Marcar horário como indisponível
          db.run(
            'UPDATE horarios_disponiveis SET disponivel = 0 WHERE data = ? AND horario = ?',
            [data, horario],
            (err) => {
              if (err) {
                console.error('Erro ao atualizar disponibilidade:', err);
              }
            }
          );

          // Enviar email
          enviarEmail(escola, email, data, horario, turmas);

          res.json({
            sucesso: true,
            mensagem: 'Agendamento realizado com sucesso!',
            id: this.lastID,
          });
        }
      );
    }
  );
});

// Função para enviar email
function enviarEmail(escola, emailEscola, data, horario, turmas) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_TO,
    subject: `Novo Agendamento de Visita - ${escola}`,
    html: `
      <h2>Novo Agendamento de Visita PIOXII</h2>
      <p><strong>Escola:</strong> ${escola}</p>
      <p><strong>Email da Escola:</strong> ${emailEscola}</p>
      <p><strong>Data:</strong> ${data}</p>
      <p><strong>Horário:</strong> ${horario}</p>
      <p><strong>Turmas:</strong> ${turmas || 'Não especificado'}</p>
      <p>Confirme a presença e entre em contato com a escola se necessário.</p>
    `,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error('Erro ao enviar email:', err);
    } else {
      console.log('Email enviado:', info.response);
    }
  });
}

// Rota para adicionar horários disponíveis (admin)
app.post('/api/horarios', verificarToken, (req, res) => {
  const { data, horario } = req.body;

  if (!data || !horario) {
    res.status(400).json({ erro: 'Data e horário são obrigatórios' });
    return;
  }

  db.run(
    'INSERT OR IGNORE INTO horarios_disponiveis (data, horario) VALUES (?, ?)',
    [data, horario],
    (err) => {
      if (err) {
        res.status(500).json({ erro: 'Erro ao adicionar horário' });
        return;
      }
      res.json({ sucesso: true, mensagem: 'Horário adicionado com sucesso' });
    }
  );
});

// Rota para deletar agendamento
app.delete('/api/agendamentos/:id', verificarToken, (req, res) => {
  const { id } = req.params;

  db.get('SELECT * FROM agendamentos WHERE id = ?', [id], (err, row) => {
    if (err || !row) {
      res.status(404).json({ erro: 'Agendamento não encontrado' });
      return;
    }

    db.run('DELETE FROM agendamentos WHERE id = ?', [id], (err) => {
      if (err) {
        res.status(500).json({ erro: 'Erro ao deletar agendamento' });
        return;
      }

      // Liberar horário
      db.run(
        'UPDATE horarios_disponiveis SET disponivel = 1 WHERE data = ? AND horario = ?',
        [row.data, row.horario],
        (err) => {
          if (err) {
            console.error('Erro ao liberar horário:', err);
          }
        }
      );

      res.json({ sucesso: true, mensagem: 'Agendamento deletado com sucesso' });
    });
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

