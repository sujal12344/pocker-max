# Poker Platform Candidate Assessments

This repository is used for role-specific technical assessments.
Each assessment is designed for **2-4 hours**.

## General candidate brief

You have joined a team maintaining a poker analytics platform. A product issue and feature request came in. Deliver a working improvement and say briefly what changed and how to verify it (your PR description is enough).

## What to submit

- A **pull request** with your changes, **or** a **screenshot** of the updated code or UI if you cannot open a PR.
- A **short video** walkthrough of your solution and how you verified it.

---

## 1) Frontend Developer Assessment

### Title
Poker Insights UI Reliability + New Metric

### Scenario
Users report that data pages are difficult to trust when loading is slow or requests fail.
Product requests one new metric on the UI.

### Tasks

1. Improve one existing data-driven page by adding:
   - loading state,
   - error state,
   - empty state.
2. Add one derived metric card (example: win-rate delta over recent games).
3. Add one interaction improvement (filter/sort/search/pagination).
4. Ensure responsiveness and readable UI structure.

### Deliverables

- Working frontend changes in this project.
- 1-2 screenshots of the updated UI.
- API request/response sample used by the updated page.
- Short verification notes.

---

## 2) Backend Developer Assessment

### Title
Poker Stats API Correctness + Stability

### Scenario
A statistics endpoint returns inconsistent values for some cases.
Frontend requires predictable contracts and clearer errors.

### Tasks

1. Identify and fix one correctness/reliability issue in an existing endpoint.
2. Add validation for key input parameters.
3. Add pagination or filtering to one list endpoint.
4. Return consistent error responses (status + message structure).
5. Add at least one unit/integration test for your change.

### Deliverables

- Backend code updates.
- Root cause + fix summary.
- Sample API calls with output.
- Test output or verification command output.

---

## 3) DevOps Engineer Assessment

### Title
Local Reliability + CI Baseline

### Scenario
The team needs reproducible local execution and baseline CI checks.

### Tasks

1. Improve local startup reliability with a one-command workflow.
2. Add/improve containerization for backend + frontend.
3. Add health checks/readiness checks.
4. Add one CI workflow (minimum: build + lint/test).
5. Improve environment variable/config handling.

### Deliverables

- Infrastructure/config updates.
- README section documenting startup and environment variables.
- CI details and proof of expected execution.

---

## 4) AI/ML Developer Assessment

### Title
Player Risk/Skill Scoring API (Explainable)

### Scenario
Product needs a lightweight player score that can be shown in the application.

### Tasks

1. Implement a scoring method (rule-based or lightweight model) using existing data.
2. Expose an endpoint returning:
   - score,
   - confidence/stability indicator,
   - short explanation of key factors.
3. Handle missing/noisy input safely.
4. Add a minimal test or reproducible script to validate behavior.

### Deliverables

- Scoring logic and API integration.
- Notes about feature choices and limitations.
- Sample outputs for at least two distinct player profiles.

---

## 5) Web3 Developer Assessment

### Title
Wallet-Linked Identity + Settlement Event Flow

### Scenario
The team is exploring wallet identity and settlement traceability while keeping core app logic mostly off-chain.

### Tasks

1. Add wallet address linking to user/profile data.
2. Add API support with wallet format validation.
3. Design and implement a settlement event payload including:
   - transaction hash placeholder,
   - chain metadata,
   - settlement details.
4. Add a UI/service integration point to trigger or view this flow.
5. Optional: add a mock chain adapter with clean interface.

### Deliverables

- Web3 integration updates.
- Sample wallet link request/response.
- Sample settlement event payload.
- Short architecture note for on-chain vs off-chain boundaries.

---

## 6) Smart Contract Developer Assessment

### Title
Minimal Settlement Contract + Integration Stub

### Scenario
Build a minimal smart contract prototype for settlement records, with basic safety and app integration readiness.

### Tasks

1. Implement one small contract flow:
   - escrow + settle, or
   - result recording with authorized caller.
2. Add access control and at least one safety measure.
3. Add contract tests (success and failure cases).
4. Provide backend/script integration stub showing interaction flow.
5. Document security assumptions and known limitations.

### Deliverables

- Contract code + tests.
- Interaction stub with app/backend.
- `SECURITY_NOTES.md` (or README section) with risk/assumption notes.

---

## 7) Cloud Engineer Assessment

### Title
Deployment-Ready Cloud Baseline

### Scenario
The platform is preparing for deployment and needs a practical operational baseline.

### Tasks

1. Define and implement a baseline covering:
   - environment separation (dev/stage/prod),
   - secrets/config strategy,
   - logging/monitoring entry points.
2. Add deployment artifacts (scripts/templates/IaC-lite/docs).
3. Define health checks and rollback/recovery approach.
4. Add concise cost/scaling considerations.

### Deliverables

- Cloud/deployment-related artifacts and notes.
- Verification checklist and command examples.
- Architecture assumptions and operational risks.

---

## Optional Local Setup Reference

If you plan to run the project locally during the assessment, you can use this section as a quick reference.
It is here to help you set up smoothly and avoid common environment issues.

If any setup detail is unclear, feel free to note your assumptions in your submission.

### Quick setup

### 1) Install server dependencies

```bash
npm install --force
```

### 2) Install client dependencies

```bash
cd client
npm install --force
```

### 3) Run project

```bash
npm start
```