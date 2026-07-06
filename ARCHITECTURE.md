# ARCHITECTURE.md

## 1. Vision

Build the ultimate decision-support platform for traders by combining
professional market data, risk management, trade simulation, portfolio
analytics and artificial intelligence into a modular, scalable frontend
architecture.

------------------------------------------------------------------------

## 2. Product Philosophy

``` text
                Market Data
                     │
                     ▼
             Market Understanding
                     │
                     ▼
            Decision Support
                     │
                     ▼
            Trade Simulation
                     │
                     ▼
            Money Management
                     │
                     ▼
          Portfolio Analytics
                     │
                     ▼
          Trade Execution
                     │
                     ▼
              Continuous Learning
```

## 3. Engineering Philosophy

``` text
Presentation
      │
      ▼
Application
      │
      ▼
Services
      │
      ▼
Providers
      │
      ▼
Infrastructure
```

## 4. Architecture Principles

1.  Single Responsibility
2.  Composition over inheritance
3.  Business before technology
4.  Features own their code
5.  Dependencies always point downward
6.  Persistence is centralized
7.  UI never communicates directly with providers
8.  Interfaces are stable
9.  Implementations are replaceable
10. Optimize for readability first

## 5. High-Level Architecture

``` text
main.tsx
 ↓
App
 ↓
Workspace
 ↓
Features
 ↓
Shared Services
 ↓
Infrastructure
```

## 6. Architectural Layers

-   **app/** --- Application shell
-   **features/** --- Business capabilities
-   **shared/** --- Reusable components and services
-   **providers/** --- External integrations

## 7. Project Structure

Explain the repository tree and, more importantly, why each folder
exists.

## 8. Feature Modules

``` text
UI
 ↓
Services
 ↓
Providers
```

Modules: - Simulator - Decision Support - Portfolio - Execution
(future) - Analytics (future) - AI (future)

## 9. Dependency Rules

``` text
UI
 ↓
Hooks
 ↓
Services
 ↓
Providers
```

Dependencies always point downward.

## 10. Data Flow

``` text
User
 ↓
React Component
 ↓
State
 ↓
Service
 ↓
Provider
 ↓
Response
 ↓
Render
```

## 11. State Management

``` text
Component State
 ↓
Feature State
 ↓
Workspace State
 ↓
Persistent Storage
```

## 12. Persistence

``` text
Workspace
 ↓
Storage Service
 ↓
localStorage
```

Components never access browser storage directly.

## 13. Services

``` text
MarketData Service
 ↓
History Service
 ↓
Provider
```

## 14. Providers

Current: - Mock

Future: - Yahoo Finance - Polygon.io - Alpaca - Internal APIs

## 15. Component Design

Each component answers: - What is my responsibility? - What state do I
own? - Who do I depend on?

## 16. UI Architecture

``` text
Workspace
 ↓
Panels
 ↓
Features
 ↓
Components
```

## 17. Decision Support Engine

``` text
Entry
 ↓
Stop
 ↓
Risk
 ↓
Position Size
 ↓
Expected Return
 ↓
Decision
```

## 18. Future Architecture

-   AI-assisted trading
-   Pattern recognition
-   Broker integrations
-   Cloud workspace
-   Collaboration
-   Mobile
-   Real-time streaming

## 19. Engineering Standards

Define conventions for: - Folder organization - Naming - Imports -
Hooks - Components - Testing - Documentation

## 20. Roadmap

``` text
Phase 1  Market Data             ✓
Phase 2  Decision Support
Phase 3  Trade Simulation
Phase 4  Money Management
Phase 5  Portfolio Analytics
Phase 6  Execution
Phase 7  Artificial Intelligence
```

# Appendix --- Architecture Decisions (ADR Lite)

## ADR-001 --- Feature-first architecture

Business capabilities scale better than technology-based folders.

## ADR-002 --- Service abstraction

Providers can be replaced without changing UI code.

## ADR-003 --- Workspace persistence

Persistence is centralized.

## ADR-004 --- TradingView adapter

Third-party libraries are isolated behind stable interfaces.
