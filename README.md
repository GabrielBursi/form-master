# FormMaster: Plataforma Dinâmica de Cadastro e Questionários

Este é um projeto desenvolvido para colocar em prática conceitos avançados de formulários com React Hook Form vistos no curso [JStack](https://jstack.com.br), integrando técnicas de formulários dinâmicos e wizard/multi-step. Inspirado em desafios reais de UX e interatividade, o objetivo principal é permitir que o usuário crie um perfil completo e, ao mesmo tempo, elabore um questionário personalizado com funcionalidades como adição, remoção e reordenação dinâmica dos campos.

Além dessas funcionalidades, o projeto explora conceitos avançados, como validação condicional, persistência de dados em sessionStorage e animações de transição utilizando Framer Motion para uma experiência fluida e intuitiva.

---

### 🔧 Funcionalidades do Projeto

#### 👤 Cadastro e Onboarding Dinâmico
- **Dados Pessoais:** Cadastro com nome, e-mail, senha e validação utilizando Zod.
- **Múltiplos Endereços e Contatos:** Adição e remoção dinâmica de campos para endereços e telefones.
- **Preferências e Interesses:** Seleção de múltiplas opções com feedback visual e validação condicional.

#### 📝 Criação Personalizada de Questionários
- **Definição de Perguntas:** Permite ao usuário criar perguntas dinâmicas, escolhendo entre diferentes tipos (múltipla escolha, resposta aberta, escala, etc.).
- **Alternativas Dinâmicas:** Inclusão, remoção e reordenação de alternativas para perguntas de múltipla escolha utilizando drag & drop.
- **Preview e Ajustes:** Etapa de revisão onde o usuário visualiza o questionário completo e pode editar ou reorganizar os itens.

#### 🚀 Funcionalidades Avançadas
- **Validação Avançada:** Validações em tempo real em cada etapa utilizando Zod para garantir a integridade dos dados antes de avançar.
- **Persistência de Dados:** Salvamento dos dados no sessionStorage para prevenir perda de informações durante o fluxo.
- **Interatividade e Animações:** Transições suaves entre etapas com Framer Motion para aprimorar a experiência do usuário.
- **Integração com API Simulada:** Simulação de chamadas a API para envio dos dados e práticas de integração backend (pode ser estendido com JSON Server ou similar).

---

### 🛠️ Tecnologias Utilizadas

#### Frontend
- **React**: Biblioteca principal para criação das interfaces.
- **React Hook Form**: Gerenciamento de formulários e validação de dados.
- **Zod**: Validação de esquemas e dados de entrada.
- **Framer Motion**: Animações e interatividade.
- **Tailwind CSS + shadcn/ui**: Estilização rápida e customizável da interface.

---

### 📚 Conteúdo Baseado nos Estudos

Este projeto aplica os seguintes conceitos abordados no curso:
- **Formulários Dinâmicos:** Criação e manipulação de arrays de campos com React Hook Form.
- **Wizard / Multi-Step Forms:** Implementação de fluxo de cadastro dividido em etapas lógicas.
- **Validação e Persistência:** Uso de Zod para validação e sessionStorage para preservação dos dados.
