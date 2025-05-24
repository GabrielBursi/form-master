# FormMaster: Plataforma Dinâmica de Cadastro e Questionários

**FormMaster** é uma aplicação fullstack desenvolvida como prática dos conceitos do curso [JStack](https://jstack.com.br), com foco em formulários dinâmicos e multi-etapas no frontend, integrando autenticação e persistência de dados no backend com Node.js, Express e MongoDB.

O sistema permite que usuários criem perfis com informações completas e elaborem questionários personalizados, com controle total sobre o conteúdo das perguntas e tipos de resposta. O backend garante segurança e integridade, exigindo autenticação para ações sensíveis como a criação de formulários.

---

### 🔐 Autenticação e Regras de Acesso

* **JWT (JSON Web Token):** Apenas usuários autenticados podem criar formulários.
* **Hash de Senha:** As senhas são armazenadas com segurança utilizando bcrypt.
* **Relacionamento 1\:N:** Cada usuário pode criar múltiplos formulários (questionários).

---

### 🔧 Funcionalidades do Projeto

#### 👤 Cadastro e Onboarding Dinâmico

* Cadastro com nome, e-mail, senha, telefone e profissão.
* Validação robusta utilizando **Zod** no frontend.
* Hash automático de senha e verificação com bcrypt no backend.

#### 📝 Criação Personalizada de Questionários

* Criação de perguntas dinâmicas com diferentes tipos:

  * Múltipla escolha
  * Aberta
  * Escala (com valor mínimo e máximo)
  * Booleana (Sim/Não)
* Definição de alternativas dinâmicas e interativas.
* Suporte a perguntas obrigatórias e opcionais.

#### 🚀 Funcionalidades Avançadas

* **Validação em Tempo Real:** Cada etapa é validada com Zod antes de avançar.
* **Persistência de Dados:** Uso de `sessionStorage` no frontend para evitar perda de progresso.
* **Transições com Framer Motion:** Animações suaves entre as etapas do formulário.
* **Integração com Backend Real:** A API está implementada com Express, Mongoose e autenticação JWT, com endpoints organizados e testados via Postman.

---

### ⚙️ Tecnologias Utilizadas

#### Frontend

* **React**
* **React Hook Form**
* **Zod**
* **Framer Motion**
* **Tailwind CSS** + **shadcn/ui**

#### Backend

* **Node.js** + **Express**
* **Mongoose** (ODM para MongoDB)
* **JWT** para autenticação
* **Bcrypt** para hash de senhas
* **Zod** para validação dos dados de entrada
* **TypeScript** para maior segurança no desenvolvimento

---

### 🗃️ Estrutura do Banco de Dados

* **User**

  * name, email, password (hash), phone, profession
  * timestamps automáticos
  * método `comparePassword` para autenticação
* **Questionnaire (Form)**

  * title, description, questions\[], userId (referência a `User`)
  * cada `question` pode conter alternativas, valores mínimos/máximos e tipo
  * relacionamento com usuário via `userId`

---

### 📚 Conteúdo Aplicado dos Estudos

* React Hook Form + Zod para formulários complexos
* Multi-step Forms com persistência
* Express API com autenticação JWT
* Mongoose e relacionamento entre coleções
