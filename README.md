# Strategic Debrief Protocol

An advanced executive decision-making strategist designed to help users make clear, structured, and intelligent life or career decisions.

<img width="1426" height="611" alt="Screenshot 2026-04-15 at 1 16 39 PM" src="https://github.com/user-attachments/assets/2d74e5b1-9947-4f10-9ffc-c262c6cf5c16" />
<img width="1341" height="638" alt="Screenshot 2026-04-15 at 1 17 32 PM" src="https://github.com/user-attachments/assets/6b898463-9b12-49a7-b372-8d686df97451" />
<img width="1388" height="666" alt="Screenshot 2026-04-15 at 1 17 24 PM" src="https://github.com/user-attachments/assets/b7d9fd26-3393-4466-a973-8bf4fcda30d4" />
<img width="1417" height="609" alt="Screenshot 2026-04-15 at 1 17 44 PM" src="https://github.com/user-attachments/assets/3ca9d977-4e34-421c-9c3a-ace96b1e96a1" />
<img width="1439" height="614" alt="Screenshot 2026-04-15 at 1 16 19 PM" src="https://github.com/user-attachments/assets/ba43d139-9133-48b6-9f9d-8e2c250b8126" />


## Project Structure (Flowchart)

```mermaid
graph TD
    A[User Input] -->|Strategic Case| B(App.tsx)
    B -->|Calls| C(geminiService.ts)
    C -->|API Request| D[Strategic Intelligence Engine]
    D -->|Structured Analysis| C
    C -->|Response| B
    B -->|Render| E[Geometric Executive Report]
    
    subgraph Frontend
        B
        C
        E
    end
    
    subgraph Backend
        F(server.ts) -->|Vite Middleware| B
        F -->|API Routes| G[Health Check]
    end
```
## Directory Structure

```text
/
├── server.ts             # Express server entry point (Full-stack)
├── package.json          # Dependencies & Scripts (tsx dev)
├── vite.config.ts        # Vite configuration
├── src/
│   ├── App.tsx           # Main UI & Logic
│   ├── main.tsx          # React entry point
│   ├── index.css         # Geometric styling & Markdown themes
│   ├── services/
│   │   └── geminiService.ts # AI Integration & System Instructions
│   └── components/       # UI Components
│       └── ui/           # shadcn/ui components
└── components.json       # shadcn configuration
```

## Features
- **Geometric Design**: Brutalist-inspired UI with high-contrast White, Green, and Blue palette.
- **Strategic Intelligence**: McKinsey-style analytical breakdowns.
- **Full-Stack**: Express backend with Vite middleware integration.
- **Animations**: Fluid motion transitions using `motion/react`.

**Developed & Authored by Jayalle Pangilinan**
