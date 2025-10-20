const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./agendamentos.db');

// Gerar datas para os próximos 30 dias
function gerarHorarios() {
  const horarios = [];
  const horariosDisponiveis = ['08:00', '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'];
  
  const hoje = new Date();
  
  for (let i = 1; i <= 30; i++) {
    const data = new Date(hoje);
    data.setDate(data.getDate() + i);
    
    // Pular fins de semana (sábado = 6, domingo = 0)
    if (data.getDay() === 0 || data.getDay() === 6) {
      continue;
    }
    
    const dataStr = data.toISOString().split('T')[0];
    
    horariosDisponiveis.forEach((horario) => {
      horarios.push({ data: dataStr, horario });
    });
  }
  
  return horarios;
}

const horarios = gerarHorarios();

db.serialize(() => {
  const stmt = db.prepare('INSERT OR IGNORE INTO horarios_disponiveis (data, horario) VALUES (?, ?)');
  
  horarios.forEach((h) => {
    stmt.run(h.data, h.horario);
  });
  
  stmt.finalize((err) => {
    if (err) {
      console.error('Erro ao inserir horários:', err);
    } else {
      console.log(`${horarios.length} horários adicionados com sucesso!`);
    }
    
    db.close((err) => {
      if (err) {
        console.error('Erro ao fechar banco de dados:', err);
      } else {
        console.log('Banco de dados fechado');
      }
    });
  });
});

