# Power CV - AI Assistant Rules

## Environment
- Client: port 5173 | Server: port 5001 | Package manager: pnpm
- Run `pnpm run build` to verify changes work
- DO NOT START APP AGAIN, ALWAYS USE RUNNING APP

## Session Start
1. Read `.ai/plan.md` for architecture and specs

## Task Workflow
**Status Flow**: PENDING → IN_PROGRESS → TESTING → DONE (or BLOCKED)

### Rules
- Follow task specs and acceptance criteria exactly
- Test changes incrementally during development
- **NEVER mark task DONE without user confirmation**
- Ask: "Have you tested this? Does everything work as expected?"
- Update task-management.md changelog after completion

## Code Standards
- React: functional components, hooks, <200 lines per file
- State: Zustand for global, local state when possible
- Styling: Tailwind CSS, mobile-first
- Always: error handling, input validation, loading states

## Session Logs
Create `.ai/sessions/[TASK-ID]-description.log` when:
- Token quota ~80% | Switching tasks | Ending session | Major issues

Include: work done, issues, current state, next steps

## Key DON'Ts
- Don't mark tasks DONE without user testing
- Don't skip testing or assume previous work is correct
- Don't start new tasks before completing current one

## Key DOs
- Keep user informed of progress
- Document deviations and issues
- Provide clear testing instructions
- Create session logs when needed

**Remember**: User confirms completion. Implement, explain
