# Sistema de Agendamento de Visitas - PIOXII

Bem-vindo ao **Sistema de Agendamento de Visitas da Faculdade PIOXII**! Esta aplicação web permite que as escolas agendem visitas da faculdade de forma simples e intuitiva.

## 📋 Características Principais

- ✅ **Calendário Interativo** - Visualize datas e horários disponíveis
- ✅ **Agendamento Fácil** - Formulário simples para registrar visitas
- ✅ **Bloqueio Automático** - Horários agendados ficam indisponíveis
- ✅ **Notificações por Email** - Confirmação automática de agendamentos
- ✅ **Painel de Administrador** - Gerenciar agendamentos e horários
- ✅ **Design Responsivo** - Funciona em dispositivos móveis e desktop
- ✅ **Logo da PIOXII** - Branding profissional integrado

## 🚀 Como Usar

### Para Escolas - Agendar uma Visita

1. **Acesse a aplicação** no navegador
2. **Clique em "Agendar Visita"** (aba padrão)
3. **Preencha os dados obrigatórios:**
   - Nome da Escola
   - Email da Escola
   - Data da Visita
   - Horário

4. **Preencha dados opcionais:**
   - Telefone
   - Turmas envolvidas
   - Observações especiais

5. **Clique em "Agendar Visita"**
6. **Confirmação** - Você receberá uma mensagem de sucesso e um email será enviado para a PIOXII

### Visualizar Calendário

1. **Clique na aba "Calendário"**
2. **Veja todos os horários disponíveis** em um grid visual
3. **Horários ocupados** aparecem com um traço (tachado) e marcados como "Agendado"
4. **Clique em um horário disponível** para ir direto ao formulário de agendamento

### Visualizar Agendamentos

1. **Clique na aba "Agendamentos"**
2. **Veja todos os agendamentos realizados** com detalhes completos
3. **Cada agendamento mostra:**
   - Nome da escola
   - Data e horário
   - Email e telefone
   - Turmas
   - Data de agendamento
   - Observações

---

## 🔐 Painel de Administrador

### Acessar o Painel

1. **Clique em "Admin"** no canto superior direito da página principal
2. **Faça login com as credenciais:**
   - Usuário: `Admin`
   - Senha: `Gcjmanus7487*`

### Funcionalidades do Admin

#### 1. Gerenciar Agendamentos
- **Visualizar todos os agendamentos** realizados
- **Filtrar por escola** ou data
- **Deletar agendamentos** se necessário
- **Acompanhar detalhes completos** de cada visita

#### 2. Gerenciar Horários
- **Adicionar novos horários disponíveis**
- **Visualizar todos os horários** (disponíveis e ocupados)
- **Horários ocupados aparecem em vermelho**
- **Horários disponíveis aparecem em verde**

### Como Adicionar Novos Horários

1. **Acesse o painel de admin**
2. **Clique em "Gerenciar Horários"**
3. **Preencha:**
   - Data (formato: mm/dd/yyyy)
   - Horário (08:00, 09:00, 10:00, etc.)
4. **Clique em "Adicionar Horário"**
5. **O novo horário aparecerá na lista abaixo**

---

## 📧 Notificações por Email

### Quando um Email é Enviado?

Sempre que uma escola realiza um agendamento, um email automático é enviado para:
- **Email:** `comunicacao@pioxii-es.com`

### Informações no Email

O email contém:
- Nome da escola
- Email de contato da escola
- Data e horário agendado
- Turmas envolvidas
- Solicitação para confirmação de presença

---

## 🛠️ Configuração Técnica

### Requisitos do Sistema

- Node.js 14+
- npm ou yarn
- Navegador moderno (Chrome, Firefox, Safari, Edge)

### Instalação

```bash
# Clonar o repositório
cd pioxii_visitas_agendamento

# Instalar dependências
npm install

# Configurar variáveis de ambiente
# Editar o arquivo .env com suas credenciais

# Iniciar o servidor
npm start
```

### Variáveis de Ambiente (.env)

```
PORT=3000
NODE_ENV=development
DB_PATH=./agendamentos.db
EMAIL_USER=seu-email@gmail.com
EMAIL_PASSWORD=sua-senha-app
EMAIL_TO=comunicacao@pioxii-es.com
ADMIN_USER=Admin
ADMIN_PASSWORD=Gcjmanus7487*
JWT_SECRET=pioxii_secret_key_2025
```

---

## 📁 Estrutura do Projeto

```
pioxii_visitas_agendamento/
├── server.js              # Backend Express.js
├── .env                   # Variáveis de ambiente
├── package.json           # Dependências do projeto
├── agendamentos.db        # Banco de dados SQLite
├── public/
│   ├── index.html         # Página principal
│   ├── admin.html         # Painel de administrador
│   ├── logo.png           # Logo da PIOXII
│   ├── css/
│   │   ├── style.css      # Estilos da página principal
│   │   └── admin.css      # Estilos do painel admin
│   └── js/
│       ├── app.js         # Lógica da página principal
│       └── admin.js       # Lógica do painel admin
└── seed-horarios.js       # Script para popular horários iniciais
```

---

## 🔧 Endpoints da API

### Agendamentos

- **GET** `/api/agendamentos` - Listar todos os agendamentos
- **POST** `/api/agendamentos` - Criar novo agendamento
- **DELETE** `/api/agendamentos/:id` - Deletar agendamento (requer autenticação)

### Horários

- **GET** `/api/horarios` - Listar horários disponíveis
- **POST** `/api/horarios` - Adicionar novo horário (requer autenticação)

### Autenticação

- **POST** `/api/login` - Fazer login e obter token JWT

---

## 🎨 Customização

### Alterar Cores

Edite o arquivo `public/css/style.css` e procure por `:root`:

```css
:root {
  --primary-color: #1a1a1a;
  --secondary-color: #ffffff;
  --accent-color: #f0f0f0;
  /* ... outras cores ... */
}
```

### Alterar Logo

Substitua o arquivo `public/logo.png` por sua logo

### Alterar Horários Disponíveis

Edite o arquivo `public/index.html` e procure por `<select id="horario">`:

```html
<option value="08:00">08:00</option>
<option value="09:00">09:00</option>
<!-- Adicione mais horários conforme necessário -->
```

---

## 🐛 Troubleshooting

### Problema: Emails não estão sendo enviados

**Solução:**
1. Verifique as credenciais no arquivo `.env`
2. Se usar Gmail, ative "Senhas de aplicativo" em sua conta Google
3. Verifique se o email de destino está correto

### Problema: Horários não aparecem no calendário

**Solução:**
1. Verifique se os horários foram adicionados via painel admin
2. Acesse o painel admin e vá para "Gerenciar Horários"
3. Adicione novos horários se necessário

### Problema: Não consigo fazer login no painel admin

**Solução:**
1. Verifique se as credenciais estão corretas
2. Verifique se o arquivo `.env` contém `ADMIN_USER` e `ADMIN_PASSWORD`
3. Reinicie o servidor

---

## 📞 Suporte

Para dúvidas ou problemas, entre em contato com:
- **Email:** comunicacao@pioxii-es.com
- **Telefone:** [Adicione o telefone da faculdade]

---

## 📄 Licença

Este projeto é propriedade da Faculdade PIOXII. Todos os direitos reservados.

---

**Versão:** 1.0.0  
**Última atualização:** 19 de outubro de 2025

