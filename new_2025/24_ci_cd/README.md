# CI/CD Pipelines

Примеры настройки Continuous Integration и Continuous Deployment.

## 🔄 Что такое CI/CD?

**CI (Continuous Integration):**

- Автоматическое тестирование при каждом коммите
- Проверка качества кода (linting)
- Security scanning

**CD (Continuous Deployment):**

- Автоматический deploy при успешных тестах
- Staging и Production окружения
- Rollback механизмы

## 🛠️ Примеры

### GitHub Actions

- `.github/workflows/ci.yml` - основной pipeline
- Запускается на push и pull requests
- Поддержка matrix builds

### GitLab CI

- `.gitlab-ci.yml` - конфигурация
- Stages: lint → test → build → deploy
- Docker registry integration

## 📊 Pipeline Stages

### 1. Lint

```bash
- ESLint проверка
- Prettier formatting
- TypeScript type check
```

### 2. Test

```bash
- Unit tests
- Integration tests
- Coverage reports (>80%)
```

### 3. Build

```bash
- Docker image build
- Push to registry
- Tag with version/SHA
```

### 4. Deploy

```bash
- Deploy to staging (auto)
- Deploy to production (manual)
- Health checks
```

## 🔐 Secrets Configuration

### GitHub Actions

```bash
# Settings → Secrets → Actions
DOCKER_USERNAME
DOCKER_PASSWORD
SERVER_HOST
SERVER_USER
SERVER_SSH_KEY
CODECOV_TOKEN
SNYK_TOKEN
```

### GitLab CI

```bash
# Settings → CI/CD → Variables
CI_REGISTRY_USER
CI_REGISTRY_PASSWORD
SSH_PRIVATE_KEY
STAGING_SERVER
PROD_SERVER
```

## 🎯 Best Practices

1. **Fail Fast** - lint перед тестами
2. **Parallel Jobs** - одновременный запуск
3. **Caching** - кеш node_modules
4. **Matrix Builds** - разные версии Node.js
5. **Manual Approval** - для production
6. **Notifications** - Slack/Discord alerts

## 📈 Metrics & Monitoring

- Code coverage tracking
- Build duration monitoring
- Deployment frequency
- Mean time to recovery (MTTR)

## 🔄 Rollback Strategy

```bash
# GitHub Actions
git revert <commit-hash>
git push

# Docker
docker-compose pull myapp:previous-tag
docker-compose up -d
```

## 🌐 Multi-Environment

### Staging

- Auto deploy from `develop`
- Test новых фич
- Integration testing

### Production

- Manual deploy from `main`
- Blue-green deployment
- Zero-downtime updates

## 📚 Дополнительные CI/CD платформы

- **CircleCI** - `.circleci/config.yml`
- **Travis CI** - `.travis.yml`
- **Jenkins** - Jenkinsfile
- **Azure Pipelines** - azure-pipelines.yml
