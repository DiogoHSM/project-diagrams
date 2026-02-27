import os, base64, json

# Paths relative to this script's location — works on any machine
_HERE     = os.path.dirname(os.path.abspath(__file__))
LOGOS_DIR = os.path.join(_HERE, "logos")        # put your SVGs here
OUTPUT    = os.path.join(_HERE, "catalog.html")

# ── 1. Embed all SVGs as base64 ──────────────────────────────────────────────
logos = {}
for f in sorted(os.listdir(LOGOS_DIR)):
    if f.endswith(".svg"):
        slug = f[:-4]
        with open(os.path.join(LOGOS_DIR, f), "rb") as fh:
            logos[slug] = "data:image/svg+xml;base64," + base64.b64encode(fh.read()).decode()

# ── 2. Catalog entries ───────────────────────────────────────────────────────
# { id, name, cat, desc, logo? }  logo defaults to id if omitted
CATALOG = [
  # ── LLMs & Inference ────────────────────────────────────────────────────
  {"id":"openai",       "name":"OpenAI",         "cat":"llm",          "desc":"APIs para GPT-4o, embeddings e DALL-E — o provedor de LLM mais adotado."},
  {"id":"gemini",       "name":"Google Gemini",  "cat":"llm",          "desc":"Família de modelos multimodais do Google — Gemini Pro e Flash via API.", "logo":"google-gemini"},
  {"id":"claude",       "name":"Claude (Anthropic)","cat":"llm",       "desc":"LLMs focados em segurança e raciocínio longo da Anthropic."},
  {"id":"anthropic",    "name":"Anthropic",       "cat":"llm",          "desc":"Empresa de pesquisa em AI safety criadora dos modelos Claude."},
  {"id":"mistral",      "name":"Mistral AI",      "cat":"llm",          "desc":"Modelos open-weight europeus de alta eficiência — Mistral, Mixtral."},
  {"id":"llama",        "name":"Meta Llama",      "cat":"llm",          "desc":"Família open-source de LLMs da Meta — base de muitos fine-tunes.", "logo":"llama"},
  {"id":"cohere",       "name":"Cohere",          "cat":"llm",          "desc":"Plataforma enterprise de NLP — embeddings, RAG e Command R."},
  {"id":"groq",         "name":"Groq",            "cat":"llm",          "desc":"Inferência ultrarrápida via LPU — latências sub-100ms para LLMs."},
  {"id":"deepseek",     "name":"DeepSeek",        "cat":"llm",          "desc":"LLMs open-source chineses de alto desempenho — DeepSeek-V2/R1."},
  {"id":"perplexity",   "name":"Perplexity",      "cat":"llm",          "desc":"Motor de busca com IA que cita fontes — API de pesquisa em tempo real."},
  {"id":"ollama",       "name":"Ollama",          "cat":"llm",          "desc":"Executa LLMs localmente (Llama, Mistral, Gemma) com uma CLI simples."},
  {"id":"replicate",    "name":"Replicate",       "cat":"llm",          "desc":"API para rodar modelos open-source de ML na nuvem sob demanda."},
  {"id":"huggingface",  "name":"Hugging Face",    "cat":"llm",          "desc":"Hub de modelos, datasets e Spaces — o GitHub da IA open-source."},

  # ── AI Frameworks & Agents ──────────────────────────────────────────────
  {"id":"langchain",    "name":"LangChain",       "cat":"ai-framework", "desc":"Framework para compor chains e agentes LLM com memória e ferramentas."},
  {"id":"langflow",     "name":"LangFlow",        "cat":"ai-framework", "desc":"UI visual para criar pipelines LangChain arrastar-e-soltar."},
  {"id":"langgraph",    "name":"LangGraph",       "cat":"ai-framework", "desc":"Framework de grafos para agentes multi-step com estado persistente."},
  {"id":"langfuse",     "name":"Langfuse",        "cat":"ai-framework", "desc":"Observabilidade e tracing para aplicações LLM em produção."},
  {"id":"llamaindex",   "name":"LlamaIndex",      "cat":"ai-framework", "desc":"Framework de dados para ingestão, indexação e RAG sobre fontes diversas."},
  {"id":"crewai",       "name":"CrewAI",          "cat":"ai-framework", "desc":"Framework de agentes em equipe — define papéis, tarefas e colaboração."},
  {"id":"autogen",      "name":"AutoGen",         "cat":"ai-framework", "desc":"Framework Microsoft para agentes multi-LLM conversando entre si."},
  {"id":"haystack",     "name":"Haystack",        "cat":"ai-framework", "desc":"Framework open-source para pipelines de NLP, RAG e busca semântica."},
  {"id":"dify",         "name":"Dify",            "cat":"ai-framework", "desc":"Plataforma open-source para criar e operar apps LLM com UI visual."},
  {"id":"chainlit",     "name":"Chainlit",        "cat":"ai-framework", "desc":"Framework para criar interfaces de chat para apps LLM em Python."},
  {"id":"gradio",       "name":"Gradio",          "cat":"ai-framework", "desc":"Cria demos web de ML com poucas linhas de Python — ideal para protótipos."},
  {"id":"streamlit",    "name":"Streamlit",       "cat":"ai-framework", "desc":"Framework Python para apps de dados interativos sem front-end separado."},
  {"id":"vellum",       "name":"Vellum",          "cat":"ai-framework", "desc":"Plataforma de gestão de prompts, testes e deploy de LLMs em produção."},
  {"id":"orby",         "name":"Orby AI",         "cat":"ai-framework", "desc":"Plataforma de automação de processos com AI agents empresariais."},
  {"id":"apify",        "name":"Apify",           "cat":"ai-framework", "desc":"Plataforma de web scraping e automação — extrai dados da web em escala."},
  {"id":"base44",       "name":"Base44",          "cat":"ai-framework", "desc":"Plataforma low-code de criação de apps com IA generativa."},
  {"id":"verdant",      "name":"Verdant.ai",      "cat":"ai-framework", "desc":"Plataforma de AI para análises e insights orientados a dados."},

  # ── Orchestration & Automation ──────────────────────────────────────────
  {"id":"n8n",          "name":"n8n",             "cat":"orchestration","desc":"Plataforma open-source de automação de workflows — self-hostável."},
  {"id":"windmill",     "name":"Windmill",        "cat":"orchestration","desc":"Plataforma open-source para scripts, workflows e UIs internas."},
  {"id":"airflow",      "name":"Apache Airflow",  "cat":"orchestration","desc":"Orquestrador de pipelines de dados baseado em DAGs — padrão de mercado."},
  {"id":"zapier",       "name":"Zapier",          "cat":"orchestration","desc":"Automação no-code conectando +6000 apps via gatilhos e ações."},
  {"id":"make",         "name":"Make (Integromat)","cat":"orchestration","desc":"Plataforma visual de automação de fluxos — alternativa ao Zapier."},
  {"id":"workato",      "name":"Workato",         "cat":"orchestration","desc":"Plataforma enterprise de integração e automação inteligente."},
  {"id":"prefect",      "name":"Prefect",         "cat":"orchestration","desc":"Orquestrador moderno de dataflows em Python com UI e observabilidade."},
  {"id":"temporal",     "name":"Temporal",        "cat":"orchestration","desc":"Plataforma de workflows duráveis — código como estado persistente."},
  {"id":"clickup",      "name":"ClickUp",         "cat":"orchestration","desc":"Plataforma all-in-one de produtividade com automações e AI."},
  {"id":"celery",       "name":"Celery",          "cat":"orchestration","desc":"Fila de tarefas assíncronas distribuída para Python com Redis/RabbitMQ."},

  # ── MLOps & AI Lifecycle ────────────────────────────────────────────────
  {"id":"kubeflow",     "name":"Kubeflow",        "cat":"mlops",        "desc":"Plataforma Kubernetes para pipelines de ML do treino ao deploy."},
  {"id":"mlflow",       "name":"MLflow",          "cat":"mlops",        "desc":"Rastreia experimentos, empacota modelos e faz deploy — open-source."},
  {"id":"zenml",        "name":"ZenML",           "cat":"mlops",        "desc":"Framework MLOps agnóstico de infraestrutura — pipelines portáteis."},
  {"id":"wandb",        "name":"Weights & Biases","cat":"mlops",        "desc":"Rastreamento de experimentos, hiperparâmetros e artefatos de ML."},
  {"id":"anaconda",     "name":"Anaconda",        "cat":"mlops",        "desc":"Distribuição Python/R para ciência de dados com gestão de ambientes."},

  # ── Data Pipelines & ETL ────────────────────────────────────────────────
  {"id":"kafka",        "name":"Apache Kafka",    "cat":"data-pipeline","desc":"Plataforma de streaming de eventos distribuída — backbone de dados em real-time."},
  {"id":"nifi",         "name":"Apache NiFi",     "cat":"data-pipeline","desc":"Plataforma visual de ingestão e roteamento de dados entre sistemas."},
  {"id":"flowfile",     "name":"FlowFile",        "cat":"data-pipeline","desc":"Modelo de dados do Apache NiFi para pacotes de dados em trânsito."},
  {"id":"airbyte",      "name":"Airbyte",         "cat":"data-pipeline","desc":"Plataforma open-source de ELT com +300 conectores pré-construídos."},
  {"id":"fivetran",     "name":"Fivetran",        "cat":"data-pipeline","desc":"ELT gerenciado com conectores confiáveis e schema automático."},
  {"id":"dbt",          "name":"dbt",             "cat":"data-pipeline","desc":"Transforma dados no warehouse com SQL versionado e testado."},
  {"id":"zookeeper",    "name":"Apache ZooKeeper","cat":"data-pipeline","desc":"Serviço de coordenação distribuída para sistemas como Kafka."},
  {"id":"apache-spark", "name":"Apache Spark",   "cat":"data-pipeline","desc":"Motor de processamento distribuído para big data em batch e streaming."},
  {"id":"apache-superset","name":"Apache Superset","cat":"data-pipeline","desc":"Plataforma de BI e exploração de dados open-source — dashboards e SQL."},

  # ── Databases & Search ──────────────────────────────────────────────────
  {"id":"postgresql",   "name":"PostgreSQL",      "cat":"database",     "desc":"SGBD relacional open-source robusto — o banco preferido para produção."},
  {"id":"redis",        "name":"Redis",           "cat":"database",     "desc":"Banco de dados in-memory chave-valor — cache, filas e sessões."},
  {"id":"mongodb",      "name":"MongoDB",         "cat":"database",     "desc":"Banco de dados NoSQL orientado a documentos JSON — flexível e escalável."},
  {"id":"sqlite",       "name":"SQLite",          "cat":"database",     "desc":"Banco de dados SQL embutido em arquivo único — zero configuração."},
  {"id":"elasticsearch","name":"Elasticsearch",   "cat":"database",     "desc":"Motor de busca e analytics distribuído baseado em Lucene."},
  {"id":"clickhouse",   "name":"ClickHouse",      "cat":"database",     "desc":"Banco colunar OLAP de alta performance para analytics em tempo real."},
  {"id":"supabase",     "name":"Supabase",        "cat":"database",     "desc":"Alternativa open-source ao Firebase — PostgreSQL com APIs auto-geradas."},
  {"id":"pinecone",     "name":"Pinecone",        "cat":"database",     "desc":"Banco de dados vetorial gerenciado para busca semântica em escala."},
  {"id":"weaviate",     "name":"Weaviate",        "cat":"database",     "desc":"Banco vetorial open-source com módulos de inferência integrados."},
  {"id":"chroma",       "name":"Chroma",          "cat":"database",     "desc":"Banco vetorial open-source para embeddings — focado em dev experience."},
  {"id":"qdrant",       "name":"Qdrant",          "cat":"database",     "desc":"Banco vetorial de alta performance em Rust com filtragem avançada."},
  {"id":"milvus",       "name":"Milvus",          "cat":"database",     "desc":"Banco vetorial open-source nativo para busca de similaridade em escala."},
  {"id":"lancedb",      "name":"LanceDB",         "cat":"database",     "desc":"Banco vetorial embutido baseado em Apache Arrow — zero servidores."},
  {"id":"neo4j",        "name":"Neo4j",           "cat":"database",     "desc":"Banco de dados de grafos — relações como cidadãos de primeira classe."},
  {"id":"snowflake",    "name":"Snowflake",       "cat":"database",     "desc":"Data warehouse cloud-native com separação de armazenamento e compute."},
  {"id":"duckdb",       "name":"DuckDB",          "cat":"database",     "desc":"Banco OLAP embutido para analytics — SQL em arquivos Parquet/CSV."},
  {"id":"opensearch",   "name":"OpenSearch",      "cat":"database",     "desc":"Fork open-source do Elasticsearch mantido pela AWS."},
  {"id":"databricks",   "name":"Databricks",      "cat":"database",     "desc":"Plataforma unificada de dados e IA sobre Delta Lake — Lakehouse."},
  {"id":"rabbitmq",     "name":"RabbitMQ",        "cat":"database",     "desc":"Message broker AMQP — filas de mensagens confiáveis para sistemas distribuídos."},

  # ── Observability & Monitoring ──────────────────────────────────────────
  {"id":"sentry",       "name":"Sentry",          "cat":"observability","desc":"Rastreamento de erros e performance em tempo real para apps web e mobile."},
  {"id":"prometheus",   "name":"Prometheus",      "cat":"observability","desc":"Sistema de monitoramento e alertas com modelo pull e TSDB próprio."},
  {"id":"opentelemetry","name":"OpenTelemetry",   "cat":"observability","desc":"Padrão aberto para coleta de traces, métricas e logs distribuídos."},
  {"id":"datadog",      "name":"Datadog",         "cat":"observability","desc":"Plataforma SaaS de observabilidade — APM, logs, métricas e dashboards."},
  {"id":"grafana",      "name":"Grafana",         "cat":"observability","desc":"Plataforma open-source de dashboards e alertas para qualquer fonte de dados."},

  # ── Auth & Security ─────────────────────────────────────────────────────
  {"id":"auth0",        "name":"Auth0",           "cat":"auth",         "desc":"Plataforma de identidade gerenciada — login social, MFA e SSO."},
  {"id":"vault",        "name":"HashiCorp Vault", "cat":"auth",         "desc":"Gestão de segredos e chaves criptográficas — zero trust para infra."},
  {"id":"cloudflare",   "name":"Cloudflare",      "cat":"auth",         "desc":"CDN, DDoS protection, DNS, Workers e Zero Trust Access."},

  # ── Comms & Integrations ────────────────────────────────────────────────
  {"id":"slack",        "name":"Slack",           "cat":"comms",        "desc":"Plataforma de comunicação empresarial com apps e automações."},
  {"id":"discord",      "name":"Discord",         "cat":"comms",        "desc":"Plataforma de comunicação com suporte a bots e comunidades técnicas."},
  {"id":"twilio",       "name":"Twilio",          "cat":"comms",        "desc":"APIs de comunicação — SMS, voz, WhatsApp e email em escala."},
  {"id":"nats",         "name":"NATS",            "cat":"comms",        "desc":"Sistema de mensageria ultrarrápido e leve para microsserviços."},
  {"id":"mqtt",         "name":"MQTT",            "cat":"comms",        "desc":"Protocolo de mensageria pub/sub leve para IoT e dispositivos edge."},
  {"id":"amazonsqs",    "name":"Amazon SQS",      "cat":"comms",        "desc":"Serviço de filas gerenciado da AWS — desacopla microsserviços."},

  # ── Cloud & Infrastructure ──────────────────────────────────────────────
  {"id":"aws",          "name":"AWS",             "cat":"cloud",        "desc":"Amazon Web Services — maior provedor cloud com +200 serviços."},
  {"id":"azure",        "name":"Microsoft Azure", "cat":"cloud",        "desc":"Cloud da Microsoft com forte integração ao ecossistema enterprise."},
  {"id":"google-cloud", "name":"Google Cloud",    "cat":"cloud",        "desc":"GCP — cloud do Google com excelência em dados, ML e Kubernetes."},
  {"id":"kubernetes",   "name":"Kubernetes",      "cat":"cloud",        "desc":"Orquestração de containers — padrão de mercado para deploy em escala."},
  {"id":"docker",       "name":"Docker",          "cat":"cloud",        "desc":"Plataforma de containers — empacota apps e dependências de forma portátil."},
  {"id":"terraform",    "name":"Terraform",       "cat":"cloud",        "desc":"Infraestrutura como código (IaC) — provisiona qualquer cloud via HCL."},
  {"id":"ansible",      "name":"Ansible",         "cat":"cloud",        "desc":"Automação de configuração e deploy sem agente via SSH e YAML."},
  {"id":"nginx",        "name":"NGINX",           "cat":"cloud",        "desc":"Servidor web e reverse proxy de alta performance — usado em 40% da web."},
  {"id":"caddy",        "name":"Caddy",           "cat":"cloud",        "desc":"Servidor web moderno com HTTPS automático via Let's Encrypt."},
  {"id":"linux",        "name":"Linux",           "cat":"cloud",        "desc":"Sistema operacional open-source — base de quase toda infra de servidores."},
  {"id":"hostinger",    "name":"Hostinger",       "cat":"cloud",        "desc":"Provedor de hospedagem web acessível com VPS e construtor de sites."},
  {"id":"vercel",       "name":"Vercel",          "cat":"cloud",        "desc":"Plataforma de deploy para front-end — Next.js nativo, edge functions."},

  # ── DevTools & CI/CD ────────────────────────────────────────────────────
  {"id":"git",          "name":"Git",             "cat":"devtools",     "desc":"Sistema de controle de versão distribuído — base de todo desenvolvimento moderno."},
  {"id":"github",       "name":"GitHub",          "cat":"devtools",     "desc":"Plataforma de hospedagem de código com CI/CD, Issues e Copilot."},
  {"id":"github-actions","name":"GitHub Actions", "cat":"devtools",     "desc":"CI/CD integrado ao GitHub — pipelines em YAML com marketplace de actions."},
  {"id":"gitlab",       "name":"GitLab",          "cat":"devtools",     "desc":"Plataforma DevOps completa — SCM, CI/CD, registry e segurança integrados."},
  {"id":"vscode",       "name":"VS Code",         "cat":"devtools",     "desc":"Editor de código open-source da Microsoft — o mais popular do mercado."},
  {"id":"vite",         "name":"Vite",            "cat":"devtools",     "desc":"Build tool ultrarrápida para front-end — HMR instantâneo com ESM nativo."},
  {"id":"openapi",      "name":"OpenAPI",         "cat":"devtools",     "desc":"Especificação para documentar APIs REST — base do Swagger e geração de código."},
  {"id":"swagger",      "name":"Swagger",         "cat":"devtools",     "desc":"Conjunto de ferramentas para design, build e documentação de APIs OpenAPI."},
  {"id":"graphql",      "name":"GraphQL",         "cat":"devtools",     "desc":"Linguagem de query para APIs — o cliente pede exatamente o que precisa."},
  {"id":"pydantic",     "name":"Pydantic",        "cat":"devtools",     "desc":"Validação de dados em Python com type hints — base do FastAPI."},
  {"id":"pytest",       "name":"pytest",          "cat":"devtools",     "desc":"Framework de testes Python — simples, extensível e o mais popular."},
  {"id":"poetry",       "name":"Poetry",          "cat":"devtools",     "desc":"Gestão de dependências e empacotamento Python moderno."},
  {"id":"uv-python",    "name":"uv",              "cat":"devtools",     "desc":"Gerenciador de pacotes Python ultrarrápido em Rust — substitui pip/venv.", "logo":"uv-python"},

  # ── Visualization & Analytics ───────────────────────────────────────────
  {"id":"plotly",       "name":"Plotly",          "cat":"viz",          "desc":"Biblioteca de gráficos interativos para Python, R e JavaScript."},
  {"id":"d3",           "name":"D3.js",           "cat":"viz",          "desc":"Biblioteca JavaScript para visualizações de dados orientadas a dados."},
  {"id":"matplotlib",   "name":"Matplotlib",      "cat":"viz",          "desc":"Biblioteca base de visualização Python — gráficos estáticos e publicação."},
  {"id":"metabase",     "name":"Metabase",        "cat":"viz",          "desc":"Plataforma de BI open-source — dashboards sem SQL para toda a empresa."},
  {"id":"tableau",      "name":"Tableau",         "cat":"viz",          "desc":"Plataforma de BI visual — padrão enterprise para análise de dados."},
  {"id":"powerbi",      "name":"Power BI",        "cat":"viz",          "desc":"Plataforma de BI da Microsoft integrada ao ecossistema Office 365."},

  # ── Frontend Frameworks ─────────────────────────────────────────────────
  {"id":"react",        "name":"React",           "cat":"frontend",     "desc":"Biblioteca UI do Facebook — o framework front-end mais adotado do mundo."},
  {"id":"nextjs",       "name":"Next.js",         "cat":"frontend",     "desc":"Framework React full-stack com SSR, SSG e App Router — padrão da Vercel."},
  {"id":"vuejs",        "name":"Vue.js",          "cat":"frontend",     "desc":"Framework JavaScript progressivo — fácil de aprender, altamente adotado."},
  {"id":"svelte",       "name":"Svelte",          "cat":"frontend",     "desc":"Framework que compila para JS puro — sem virtual DOM, bundle mínimo."},
  {"id":"angular",      "name":"Angular",         "cat":"frontend",     "desc":"Framework TypeScript full-featured do Google — padrão enterprise."},
  {"id":"astro",        "name":"Astro",           "cat":"frontend",     "desc":"Framework para sites de conteúdo — HTML-first, zero JS por padrão."},
  {"id":"tailwindcss",  "name":"Tailwind CSS",    "cat":"frontend",     "desc":"Framework CSS utility-first — composição de classes no HTML."},
  {"id":"html5",        "name":"HTML5",           "cat":"frontend",     "desc":"Quinta versão da linguagem de marcação da web — base de toda página."},
  {"id":"css3",         "name":"CSS3",            "cat":"frontend",     "desc":"Folhas de estilo em cascata — controla aparência e layout da web."},

  # ── Backend Frameworks & Libs ───────────────────────────────────────────
  {"id":"fastapi",      "name":"FastAPI",         "cat":"backend",      "desc":"Framework Python moderno para APIs REST — async, tipado e ultrarrápido."},
  {"id":"flask",        "name":"Flask",           "cat":"backend",      "desc":"Microframework Python minimalista para APIs e apps web."},
  {"id":"pandas",       "name":"Pandas",          "cat":"backend",      "desc":"Biblioteca Python para manipulação de dados tabulares — DataFrame."},
  {"id":"numpy",        "name":"NumPy",           "cat":"backend",      "desc":"Computação numérica em Python — arrays N-dimensionais de alta performance."},
  {"id":"pytorch",      "name":"PyTorch",         "cat":"backend",      "desc":"Framework de deep learning do Facebook — preferido em pesquisa."},
  {"id":"tensorflow",   "name":"TensorFlow",      "cat":"backend",      "desc":"Framework de ML do Google — deploy em produção e edge."},
  {"id":"keras",        "name":"Keras",           "cat":"backend",      "desc":"API de alto nível para redes neurais — roda sobre TensorFlow/JAX/PyTorch."},
  {"id":"scikit-learn", "name":"Scikit-learn",    "cat":"backend",      "desc":"Biblioteca Python de ML clássico — SVM, árvores, clustering, pipelines."},
  {"id":"jupyter",      "name":"Jupyter",         "cat":"backend",      "desc":"Notebooks interativos para exploração de dados e prototipagem."},

  # ── Programming Languages ───────────────────────────────────────────────
  {"id":"python",       "name":"Python",          "cat":"language",     "desc":"Linguagem de alto nível preferida para IA, dados e automação."},
  {"id":"javascript",   "name":"JavaScript",      "cat":"language",     "desc":"A linguagem da web — roda no browser e no servidor via Node.js."},
  {"id":"typescript",   "name":"TypeScript",      "cat":"language",     "desc":"Superset tipado do JavaScript — maior segurança e manutenibilidade."},
  {"id":"go",           "name":"Go (Golang)",      "cat":"language",     "desc":"Linguagem compilada do Google — concorrência nativa com goroutines."},
  {"id":"rust",         "name":"Rust",            "cat":"language",     "desc":"Linguagem de sistemas com segurança de memória sem GC — máxima performance."},
  {"id":"java",         "name":"Java",            "cat":"language",     "desc":"Linguagem OO da JVM — ecossistema enterprise e Android."},
  {"id":"kotlin",       "name":"Kotlin",          "cat":"language",     "desc":"Linguagem moderna da JetBrains — preferida para Android e backend JVM."},
  {"id":"scala",        "name":"Scala",           "cat":"language",     "desc":"Linguagem JVM funcional e OO — base do Apache Spark."},
  {"id":"php",          "name":"PHP",             "cat":"language",     "desc":"Linguagem server-side amplamente usada em WordPress e web tradicional."},
  {"id":"ruby",         "name":"Ruby",            "cat":"language",     "desc":"Linguagem dinâmica elegante — famosa pelo framework Rails."},
  {"id":"swift",        "name":"Swift",           "cat":"language",     "desc":"Linguagem da Apple para iOS, macOS e desenvolvimento server-side."},
  {"id":"csharp",       "name":"C# (.NET)",       "cat":"language",     "desc":"Linguagem da Microsoft para desktop, web, jogos (Unity) e Azure."},
  {"id":"cplusplus",    "name":"C++",             "cat":"language",     "desc":"Linguagem de sistemas de alto desempenho — jogos, embarcados, ML engines."},
  {"id":"bash",         "name":"Bash / Shell",    "cat":"language",     "desc":"Shell scripting para automação, pipelines e administração de sistemas."},
  {"id":"r-lang",       "name":"R",               "cat":"language",     "desc":"Linguagem estatística para análise de dados, ML e visualização."},
  {"id":"powershell",   "name":"PowerShell",      "cat":"language",     "desc":"Shell e linguagem de scripting da Microsoft para automação Windows/Azure."},

  # ── Protocols & Transports ──────────────────────────────────────────────
  {"id":"websocket",    "name":"WebSocket",       "cat":"protocol",     "desc":"Protocolo de comunicação full-duplex sobre TCP — conexão persistente bidirecional."},
  {"id":"http",         "name":"HTTP / REST",     "cat":"protocol",     "desc":"Protocolo de transferência de hipertexto — base de todas as APIs web."},
  {"id":"grpc",         "name":"gRPC",            "cat":"protocol",     "desc":"Framework RPC da Google sobre HTTP/2 e Protocol Buffers — baixa latência."},
  {"id":"sqs",          "name":"SQS Protocol",    "cat":"protocol",     "desc":"Padrão de filas de mensagens gerenciadas — desacoplamento assíncrono."},
  {"id":"pubsub",       "name":"GCP Pub/Sub",     "cat":"protocol",     "desc":"Serviço de mensageria assíncrona do Google Cloud — streaming de eventos."},
  {"id":"mcp",          "name":"MCP",             "cat":"protocol",     "desc":"Model Context Protocol — padrão Anthropic para integrar LLMs a ferramentas."},
  {"id":"cron",         "name":"Cron",            "cat":"protocol",     "desc":"Agendador de tarefas Unix — expressões cron para jobs recorrentes."},
  {"id":"webhook",      "name":"Webhook",         "cat":"protocol",     "desc":"Callback HTTP acionado por eventos — integração push entre sistemas."},

  # ── Concept Tags ────────────────────────────────────────────────────────
  {"id":"tag-fullstack","name":"Full Stack",      "cat":"tag",          "desc":"Cobre front-end, back-end, banco de dados e infraestrutura.", "logo":"tag-fullstack"},
  {"id":"tag-devops",   "name":"DevOps",          "cat":"tag",          "desc":"Práticas de CI/CD, IaC, monitoramento e entrega contínua.", "logo":"tag-devops"},
  {"id":"tag-mlops",    "name":"MLOps",           "cat":"tag",          "desc":"Ciclo de vida de modelos ML: treino, deploy, monitoramento.", "logo":"tag-mlops"},
  {"id":"tag-frontend", "name":"Frontend",        "cat":"tag",          "desc":"Camada de interface e experiência do usuário.", "logo":"tag-frontend"},
  {"id":"tag-backend",  "name":"Backend",         "cat":"tag",          "desc":"Lógica de negócio, APIs e processamento server-side.", "logo":"tag-backend"},
  {"id":"tag-datawarehouse","name":"Data Warehouse","cat":"tag",        "desc":"Repositório centralizado para analytics e BI.", "logo":"tag-datawarehouse"},
  {"id":"tag-datalake", "name":"Data Lake",       "cat":"tag",          "desc":"Armazenamento bruto de dados estruturados e não-estruturados.", "logo":"tag-datalake"},
  {"id":"tag-bigdata",  "name":"Big Data",        "cat":"tag",          "desc":"Processamento de volumes massivos com frameworks distribuídos.", "logo":"tag-bigdata"},
  {"id":"tag-pipeline", "name":"Pipeline",        "cat":"tag",          "desc":"Sequência de etapas de transformação e movimentação de dados.", "logo":"tag-pipeline"},
  {"id":"tag-ingestion","name":"Ingestion",       "cat":"tag",          "desc":"Captura e ingestão de dados de fontes externas.", "logo":"tag-ingestion"},
  {"id":"tag-streaming","name":"Streaming",       "cat":"tag",          "desc":"Processamento de eventos em tempo real de forma contínua.", "logo":"tag-streaming"},
  {"id":"tag-api",      "name":"API",             "cat":"tag",          "desc":"Interface de programação entre sistemas.", "logo":"tag-api"},
  {"id":"tag-rag",      "name":"RAG",             "cat":"tag",          "desc":"Retrieval-Augmented Generation: busca + geração com LLM.", "logo":"tag-rag"},
  {"id":"tag-agent",    "name":"AI Agent",        "cat":"tag",          "desc":"Sistema autônomo que usa LLM para raciocinar e agir.", "logo":"tag-agent"},
  {"id":"tag-llm",      "name":"LLM",             "cat":"tag",          "desc":"Large Language Model: modelo de linguagem de grande escala.", "logo":"tag-llm"},
  {"id":"tag-realtime", "name":"Real-time",       "cat":"tag",          "desc":"Processamento e entrega com latência mínima (<1s).", "logo":"tag-realtime"},
]

# Resolve logo key (defaults to id if not overridden)
for e in CATALOG:
    e.setdefault("logo", e["id"])

# Attach base64 logo if available, else None
for e in CATALOG:
    e["img"] = logos.get(e["logo"])

# ── 3. Category metadata ─────────────────────────────────────────────────────
CATEGORIES = [
  {"id":"llm",          "label":"LLMs & Inference",            "color":"#7C3AED","bg":"#F3E8FF","border":"#DDD6FE"},
  {"id":"ai-framework", "label":"AI Frameworks & Agentes",     "color":"#4F46E5","bg":"#EEF2FF","border":"#C7D2FE"},
  {"id":"orchestration","label":"Orquestração & Automação",    "color":"#1D4ED8","bg":"#EFF6FF","border":"#BFDBFE"},
  {"id":"mlops",        "label":"MLOps & AI Lifecycle",        "color":"#0E7490","bg":"#ECFEFF","border":"#A5F3FC"},
  {"id":"data-pipeline","label":"Data Pipelines & ETL",        "color":"#15803D","bg":"#F0FDF4","border":"#BBF7D0"},
  {"id":"database",     "label":"Databases & Search",          "color":"#166534","bg":"#DCFCE7","border":"#86EFAC"},
  {"id":"observability","label":"Observabilidade",             "color":"#B45309","bg":"#FFFBEB","border":"#FDE68A"},
  {"id":"auth",         "label":"Auth & Segurança",            "color":"#BE123C","bg":"#FFF1F2","border":"#FECDD3"},
  {"id":"comms",        "label":"Comunicação & Integrações",   "color":"#A21CAF","bg":"#FDF4FF","border":"#F0ABFC"},
  {"id":"cloud",        "label":"Cloud & Infraestrutura",      "color":"#0369A1","bg":"#F0F9FF","border":"#BAE6FD"},
  {"id":"devtools",     "label":"DevTools & CI/CD",            "color":"#475569","bg":"#F8FAFC","border":"#CBD5E1"},
  {"id":"viz",          "label":"Visualização & Analytics",    "color":"#C2410C","bg":"#FFF7ED","border":"#FED7AA"},
  {"id":"frontend",     "label":"Frontend Frameworks",         "color":"#9F1239","bg":"#FFF1F2","border":"#FECDD3"},
  {"id":"backend",      "label":"Backend & ML Libs",           "color":"#047857","bg":"#ECFDF5","border":"#A7F3D0"},
  {"id":"language",     "label":"Linguagens de Programação",   "color":"#6D28D9","bg":"#FAF5FF","border":"#DDD6FE"},
  {"id":"protocol",     "label":"Protocolos & Transportes",    "color":"#374151","bg":"#F9FAFB","border":"#E5E7EB"},
  {"id":"tag",          "label":"Concept Tags",                "color":"#5B21B6","bg":"#F5F3FF","border":"#EDE9FE"},
]
cat_map = {c["id"]: c for c in CATEGORIES}

# ── 4. Render HTML ────────────────────────────────────────────────────────────
catalog_json = json.dumps(CATALOG,  ensure_ascii=False, separators=(",",":"))
cats_json    = json.dumps(CATEGORIES, ensure_ascii=False, separators=(",",":"))
total        = len(CATALOG)

HTML = f"""<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Tech Catalog</title>
<style>
*, *::before, *::after {{ box-sizing: border-box; margin: 0; padding: 0; }}
:root {{
  --sidebar-w: 240px;
  --topbar-h: 56px;
  --bg: #F4F6F8;
  --surface: #FFFFFF;
  --border: #E2E8F0;
  --text: #0F172A;
  --sub: #64748B;
  --radius: 10px;
  --shadow: 0 1px 3px rgba(0,0,0,.08), 0 1px 2px rgba(0,0,0,.05);
}}
body {{ font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: var(--bg); color: var(--text); display: flex; flex-direction: column; height: 100vh; overflow: hidden; }}

/* ── Topbar ── */
#topbar {{
  height: var(--topbar-h); background: var(--surface); border-bottom: 1px solid var(--border);
  display: flex; align-items: center; gap: 12px; padding: 0 16px; flex-shrink: 0; z-index: 10;
}}
#topbar h1 {{ font-size: 16px; font-weight: 700; letter-spacing: -.3px; white-space: nowrap; }}
#topbar h1 span {{ color: #6366F1; }}
#search-wrap {{ flex: 1; max-width: 420px; position: relative; }}
#search {{ width: 100%; border: 1px solid var(--border); border-radius: 8px; padding: 7px 12px 7px 34px;
  font-size: 14px; background: var(--bg); color: var(--text); outline: none; }}
#search:focus {{ border-color: #6366F1; box-shadow: 0 0 0 3px rgba(99,102,241,.15); }}
#search-icon {{ position: absolute; left: 10px; top: 50%; transform: translateY(-50%); color: var(--sub); pointer-events: none; }}
#count {{ font-size: 13px; color: var(--sub); white-space: nowrap; margin-left: auto; }}

/* ── Layout ── */
#layout {{ display: flex; flex: 1; overflow: hidden; }}

/* ── Sidebar ── */
#sidebar {{
  width: var(--sidebar-w); background: var(--surface); border-right: 1px solid var(--border);
  overflow-y: auto; flex-shrink: 0; padding: 12px 0;
}}
.cat-item {{
  display: flex; align-items: center; gap: 8px; padding: 7px 14px; cursor: pointer;
  border-radius: 0; font-size: 13px; color: var(--sub); transition: background .12s, color .12s;
  user-select: none; border-left: 3px solid transparent;
}}
.cat-item:hover {{ background: var(--bg); color: var(--text); }}
.cat-item.active {{ color: var(--text); font-weight: 600; background: var(--bg); }}
.cat-dot {{ width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }}
.cat-count {{ margin-left: auto; font-size: 11px; background: var(--bg); border-radius: 10px;
  padding: 1px 6px; color: var(--sub); border: 1px solid var(--border); }}
.sidebar-sep {{ height: 1px; background: var(--border); margin: 8px 14px; }}
.sidebar-all {{ padding: 7px 14px; font-size: 13px; font-weight: 600; color: var(--sub);
  cursor: pointer; display: flex; align-items: center; gap: 8px; }}
.sidebar-all:hover {{ color: var(--text); }}
.sidebar-all.active {{ color: #6366F1; }}

/* ── Main ── */
#main {{ flex: 1; overflow-y: auto; padding: 20px; }}
#grid {{
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 14px;
}}

/* ── Card ── */
.card {{
  background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius);
  padding: 16px; display: flex; flex-direction: column; gap: 10px;
  box-shadow: var(--shadow); transition: transform .15s, box-shadow .15s; cursor: default;
}}
.card:hover {{ transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,.1); }}
.card-top {{ display: flex; align-items: center; gap: 10px; }}
.logo-wrap {{
  width: 40px; height: 40px; border-radius: 8px; border: 1px solid var(--border);
  background: var(--bg); display: flex; align-items: center; justify-content: center;
  overflow: hidden; flex-shrink: 0;
}}
.logo-wrap img {{ width: 32px; height: 32px; object-fit: contain; }}
.logo-avatar {{
  width: 40px; height: 40px; border-radius: 8px; display: flex; align-items: center;
  justify-content: center; font-size: 15px; font-weight: 700; color: white; flex-shrink: 0;
}}
.card-name {{ font-size: 14px; font-weight: 600; line-height: 1.3; }}
.cat-badge {{
  display: inline-flex; align-items: center; font-size: 11px; font-weight: 600;
  padding: 2px 8px; border-radius: 99px; border: 1px solid; width: fit-content;
}}
.card-desc {{ font-size: 12.5px; color: var(--sub); line-height: 1.5; }}

/* ── Empty state ── */
#empty {{ display: none; flex-direction: column; align-items: center; justify-content: center;
  height: 200px; color: var(--sub); gap: 8px; }}
#empty svg {{ opacity: .3; }}

/* ── Scrollbar ── */
::-webkit-scrollbar {{ width: 6px; }} ::-webkit-scrollbar-track {{ background: transparent; }}
::-webkit-scrollbar-thumb {{ background: #CBD5E1; border-radius: 3px; }}
</style>
</head>
<body>

<div id="topbar">
  <h1>Tech <span>Catalog</span></h1>
  <div id="search-wrap">
    <svg id="search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
    </svg>
    <input id="search" type="text" placeholder="Buscar por nome, categoria ou descrição…" autocomplete="off">
  </div>
  <div id="count"></div>
</div>

<div id="layout">
  <nav id="sidebar">
    <div class="sidebar-all active" data-cat="all">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
      Todos
    </div>
    <div class="sidebar-sep"></div>
    <!-- categories injected by JS -->
  </nav>
  <main id="main">
    <div id="grid"></div>
    <div id="empty">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
      <p>Nenhum resultado encontrado.</p>
    </div>
  </main>
</div>

<script>
const CATALOG = {catalog_json};
const CATEGORIES = {cats_json};
const catMap = Object.fromEntries(CATEGORIES.map(c => [c.id, c]));

let activeFilter = "all";
let searchQuery  = "";

// ── Sidebar ──────────────────────────────────────────────────────────────────
const sidebar = document.getElementById("sidebar");
const counts  = Object.fromEntries(CATEGORIES.map(c => [c.id, 0]));
CATALOG.forEach(e => {{ if (counts[e.cat] !== undefined) counts[e.cat]++; }});

CATEGORIES.forEach(cat => {{
  const el = document.createElement("div");
  el.className = "cat-item";
  el.dataset.cat = cat.id;
  el.innerHTML = `<span class="cat-dot" style="background:${{cat.color}}"></span>
    ${{cat.label}}<span class="cat-count">${{counts[cat.id]}}</span>`;
  el.addEventListener("click", () => setFilter(cat.id));
  sidebar.appendChild(el);
}});

// ── Filter & Search ───────────────────────────────────────────────────────────
function setFilter(cat) {{
  activeFilter = cat;
  document.querySelectorAll(".cat-item, .sidebar-all").forEach(el => {{
    el.classList.toggle("active", el.dataset.cat === cat);
  }});
  render();
}}

document.querySelector(".sidebar-all").addEventListener("click", () => setFilter("all"));
document.getElementById("search").addEventListener("input", e => {{
  searchQuery = e.target.value.toLowerCase();
  render();
}});

// ── Avatar color from string ──────────────────────────────────────────────────
function avatarColor(id) {{
  const cat = catMap[CATALOG.find(e => e.id === id)?.cat] || {{}};
  return cat.color || "#6366F1";
}}

// ── Render ───────────────────────────────────────────────────────────────────
const grid  = document.getElementById("grid");
const empty = document.getElementById("empty");
const count = document.getElementById("count");

function render() {{
  const q = searchQuery;
  const filtered = CATALOG.filter(e => {{
    const matchCat  = activeFilter === "all" || e.cat === activeFilter;
    const matchText = !q || e.name.toLowerCase().includes(q)
                         || e.desc.toLowerCase().includes(q)
                         || (catMap[e.cat]?.label || "").toLowerCase().includes(q);
    return matchCat && matchText;
  }});

  count.textContent = filtered.length + " de {total}";
  grid.innerHTML = "";
  empty.style.display = filtered.length ? "none" : "flex";

  filtered.forEach(e => {{
    const cat   = catMap[e.cat] || {{}};
    const color = cat.color || "#6366F1";
    const initial = e.name.charAt(0).toUpperCase();

    const logoHtml = e.img
      ? `<div class="logo-wrap"><img src="${{e.img}}" alt="${{e.name}}" loading="lazy"></div>`
      : `<div class="logo-avatar" style="background:${{color}}">${{initial}}</div>`;

    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <div class="card-top">
        ${{logoHtml}}
        <div class="card-name">${{e.name}}</div>
      </div>
      <span class="cat-badge" style="color:${{color}};background:${{cat.bg||"#F8F8F8"}};border-color:${{cat.border||"#DDD"}}">
        ${{cat.label || e.cat}}
      </span>
      <div class="card-desc">${{e.desc}}</div>
    `;
    grid.appendChild(card);
  }});
}}

render();
</script>
</body>
</html>"""

with open(OUTPUT, "w", encoding="utf-8") as f:
    f.write(HTML)

print(f"Generated: {OUTPUT}")
total_logos = sum(1 for e in CATALOG if e.get("img"))
print(f"Entries: {len(CATALOG)} | With logo: {total_logos} | Without: {len(CATALOG)-total_logos}")
