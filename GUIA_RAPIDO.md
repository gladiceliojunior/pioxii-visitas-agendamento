# 🚀 Guia Rápido - Sistema de Agendamento PIOXII

## ⚡ Início Rápido

### 1. Iniciar o Servidor

```bash
cd pioxii_visitas_agendamento
npm start
```

O servidor rodará em: `http://localhost:3000`

### 2. Acessar a Aplicação

- **Página Principal:** `http://localhost:3000`
- **Painel Admin:** `http://localhost:3000/admin.html`

---

## 👥 Usuários Padrão

### Admin
- **Usuário:** Admin
- **Senha:** Gcjmanus7487*

---

## 📋 Fluxo Básico

### Para Escolas

1. Acesse a página principal
2. Clique em "Agendar Visita"
3. Preencha o formulário:
   - Nome da Escola (obrigatório)
   - Email (obrigatório)
   - Data (obrigatório)
   - Horário (obrigatório)
   - Telefone, Turmas, Observações (opcionais)
4. Clique em "Agendar Visita"
5. Pronto! Um email será enviado para comunicacao@pioxii-es.com

### Para Administrador

1. Acesse `http://localhost:3000/admin.html`
2. Faça login com Admin / Gcjmanus7487*
3. **Aba Agendamentos:**
   - Visualize todos os agendamentos
   - Filtre por escola ou data
   - Delete agendamentos se necessário

4. **Aba Gerenciar Horários:**
   - Adicione novos horários
   - Visualize horários disponíveis (verde) e ocupados (vermelho)

---

## 🔧 Configuração Importante

### Arquivo .env

Edite o arquivo `.env` na raiz do projeto:

```
PORT=3000
NODE_ENV=development
EMAIL_USER=gladceliojunior@gmail.com
EMAIL_PASSWORD=Gcjg7487*
EMAIL_TO=comunicacao@pioxii-es.com
ADMIN_USER=Admin
ADMIN_PASSWORD=Gcjmanus7487*
JWT_SECRET=pioxii_secret_key_2025
```

**Nota:** Se usar Gmail, você precisa gerar uma "Senha de Aplicativo" em vez de usar sua senha normal.

---

## 📊 Banco de Dados

O banco de dados SQLite é criado automaticamente na primeira execução:
- **Arquivo:** `agendamentos.db`
- **Tabelas:**
  - `agendamentos` - Armazena os agendamentos das escolas
  - `horarios_disponiveis` - Armazena os horários disponíveis

### Popular Horários Iniciais

```bash
node seed-horarios.js
```

Isso adiciona horários para os próximos 30 dias (segunda a sexta, 08:00 a 16:00).

---

## 🎯 Funcionalidades Principais

| Funcionalidade | Descrição |
|---|---|
| 📅 Calendário | Visualize todos os horários disponíveis |
| 📝 Agendamento | Escolas agendam visitas facilmente |
| 🔒 Bloqueio | Horários agendados ficam indisponíveis |
| 📧 Email | Notificação automática para comunicacao@pioxii-es.com |
| 👨‍💼 Admin | Painel completo de gerenciamento |
| 📱 Responsivo | Funciona em mobile, tablet e desktop |

---

## 🌐 URLs Importantes

| Página | URL |
|---|---|
| Página Principal | `http://localhost:3000` |
| Painel Admin | `http://localhost:3000/admin.html` |
| API - Agendamentos | `http://localhost:3000/api/agendamentos` |
| API - Horários | `http://localhost:3000/api/horarios` |
| API - Login | `http://localhost:3000/api/login` |

---

## ✅ Checklist de Configuração

- [ ] Node.js instalado
- [ ] Dependências instaladas (`npm install`)
- [ ] Arquivo `.env` configurado
- [ ] Servidor iniciado (`npm start`)
- [ ] Página principal acessível
- [ ] Painel admin acessível
- [ ] Horários populados (`node seed-horarios.js`)
- [ ] Email configurado e testado

---

## 🆘 Problemas Comuns

### Porta 3000 já está em uso
```bash
# Mude a porta no arquivo .env
PORT=3001
```

### Emails não estão sendo enviados
1. Verifique credenciais no `.env`
2. Se usar Gmail, gere uma "Senha de Aplicativo"
3. Verifique se o email de destino está correto

### Erro ao conectar ao banco de dados
1. Delete o arquivo `agendamentos.db`
2. Reinicie o servidor
3. Execute `node seed-horarios.js`

---

## 📞 Contato

**Email:** comunicacao@pioxii-es.com

---

**Versão:** 1.0.0  
**Última atualização:** 19 de outubro de 2025

