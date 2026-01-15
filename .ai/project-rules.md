# Power CV - Project Rules for AI Chat Sessions

## 🎯 Session Initialization Protocol

When starting a new AI chat session, ALWAYS follow these steps:
### 0. How to approach
- Client & Server are started by user, don't start again
- Client access at port 5173
- Server access at port 5001
- Use pnpm
- Run "pnpm run build" on your own to make sure stuff work
- After complete each task, use `git add` `git commit -m""` `git push` to push change to git, commit message format: "[Task ID] [Type: Feature, Fix Bug, ...] [Shortly brief what we have done so far]"
- Use `git status` to check files changed

### 1. Check Task Management Status
- **READ** `.ai/task-management.md` to identify:
  - Current task in progress
  - Last completed task
  - Overall project progress
  - Recent changes and issues

### 2. Review Project Knowledge Base
- **READ** `.ai/plan.md` for:
  - Project overview and objectives
  - Technical architecture
  - Data models and API specifications
  - Implementation phases and features

### 3. Load Current Task Details
- If a task is IN_PROGRESS, read the corresponding task file in `.ai/tasks/`
- Understand the acceptance criteria and testing requirements
- Review any blockers or notes from previous sessions

## 📋 Task Execution Rules

### Before Starting Work
1. **Confirm** you understand the current task requirements
2. **Ask** the user if there are any updates or changes to the task
3. **Verify** all dependencies and prerequisites are met

### During Development
1. **Follow** the exact specifications in the task file
2. **Test** each change as you implement it
3. **Document** any deviations or issues encountered
4. **Keep** the user informed of progress

### After Completing Work
1. **DO NOT** mark task as DONE yourself
2. **ASK** the user to test the implementation
3. **WAIT** for user confirmation with exact phrase: "Have you tested this? Does everything work as expected?"
4. **ONLY** mark task as DONE after user explicitly confirms testing passed
5. **UPDATE** task-management.md with completion details and changelog

## 🔄 Task Status Workflow

```
PENDING → IN_PROGRESS → TESTING → DONE
                ↓
            BLOCKED (if issues arise)
```

### Status Definitions
- **PENDING**: Not started, waiting to begin
- **IN_PROGRESS**: Currently being worked on
- **BLOCKED**: Stuck due to dependencies or issues
- **TESTING**: Implementation complete, awaiting user testing
- **DONE**: User confirmed working, task completed

## 📝 Changelog Requirements

After each task completion, update `.ai/task-management.md` with:

```markdown
### [Task ID] - [Short Description] - [Date]
**Status**: DONE
**Changes Made**:
- Bullet point list of what was implemented
- Files created/modified
- Features added

**Testing Notes**:
- What the user tested
- Any issues found and resolved

**Next Steps**:
- What should be done next
- Any dependencies for upcoming tasks
```

## 💾 Session Log Creation

### When to Create Session Logs
Create a session log when:
- Token quota is running low (approaching 80% usage)
- Switching to a different task
- Ending a work session
- Encountering significant issues or pivots

### Session Log Format
File: `.ai/sessions/[TASK-ID]-[short-description].log`

Example: `.ai/sessions/TASK-001-project-setup.log`

### Session Log Content
```markdown
# Session Log: [Task ID] - [Short Description]

**Date**: YYYY-MM-DD
**Duration**: X hours/minutes
**Task Status**: [IN_PROGRESS/BLOCKED/TESTING/DONE]

## Work Completed
- List of specific accomplishments
- Files created/modified
- Features implemented

## Issues Encountered
- Problems found and how they were resolved
- Blockers that need attention

## Current State
- What's working
- What's not working
- What's left to do

## Next Session Actions
- Clear next steps
- Priority items
- Dependencies to address

## Context for Next Agent
- Important decisions made
- Patterns established
- Things to be aware of
```

## 🚫 Important DON'Ts

1. **NEVER** mark a task as DONE without explicit user confirmation
2. **NEVER** skip testing phases
3. **NEVER** assume previous work is correct without verification
4. **NEVER** start a new task before completing the current one
5. **NEVER** modify task files without updating task-management.md
6. **NEVER** ignore the task acceptance criteria

## ✅ Important DOs

1. **ALWAYS** read task-management.md at session start
2. **ALWAYS** ask user to test before marking done
3. **ALWAYS** update changelog after task completion
4. **ALWAYS** create session logs when needed
5. **ALWAYS** follow the data models in plan.md
6. **ALWAYS** keep code modular and maintainable
7. **ALWAYS** add appropriate error handling
8. **ALWAYS** consider mobile responsiveness
9. **ALWAYS** validate user inputs
10. **ALWAYS** maintain code consistency

## 🎨 Code Quality Standards

### React Components
- Use functional components with hooks
- Keep components small and focused (< 200 lines)
- Use meaningful prop names
- Add PropTypes or TypeScript for type safety
- Implement proper error boundaries

### State Management
- Use Zustand for global state
- Keep local state in components when possible
- Avoid prop drilling (use context/store)

### Styling
- Use Tailwind CSS utility classes
- Follow mobile-first approach
- Maintain consistent spacing scale
- Use semantic color names

### API Integration
- Handle loading states
- Handle error states
- Show user-friendly error messages
- Implement proper request cancellation

### File Organization
- One component per file
- Group related files in directories
- Use index.js for clean imports
- Keep utils/helpers separate

## 🧪 Testing Requirements

### Manual Testing Checklist (for user)
Every task should include clear testing steps:
1. What to click/interact with
2. What data to enter
3. What to expect as output
4. Edge cases to verify

### Before Asking User to Test
- Test the happy path yourself
- Check for console errors
- Verify responsive behavior
- Ensure no breaking changes to existing features

## 📚 Documentation Standards

### Code Comments
- Explain WHY, not WHAT
- Document complex logic
- Add TODO comments for future improvements
- Include examples for utility functions

### README Updates
- Keep installation steps current
- Document new environment variables
- Update feature list as implemented
- Include screenshots for visual features

## 🔐 Security Considerations

1. Validate all user inputs (client AND server)
2. Sanitize data before rendering (prevent XSS)
3. Use environment variables for sensitive data
4. Implement proper CORS policies
5. Limit file upload sizes
6. Never commit .env files

## 🎯 User Communication Protocol

### Status Updates
- Inform user of major steps being taken
- Explain complex decisions
- Ask for clarification when requirements are unclear

### Problem Reporting
- Clearly state the issue
- Explain attempted solutions
- Suggest alternatives
- Ask for user preference

### Task Completion
- Summarize what was implemented
- List files created/modified
- Provide clear testing instructions
- Wait for user confirmation

## 📊 Progress Tracking

### Daily/Session Goals
- Set clear objectives at session start
- Track progress against acceptance criteria
- Adjust approach if blocked
- Document learnings

### Milestone Awareness
- Know which phase the project is in
- Understand dependencies between tasks
- Anticipate upcoming requirements
- Plan for integration points

## 🔄 Context Preservation

### Between Sessions
- Save important decisions in session logs
- Document architectural choices
- Note patterns being followed
- Record user preferences

### For Future Agents
- Write clear, self-documenting code
- Leave helpful comments
- Update task files with insights
- Create comprehensive session logs

---

## Quick Reference Checklist

**Starting a Session:**
- [ ] Read task-management.md
- [ ] Read plan.md
- [ ] Load current task details
- [ ] Verify prerequisites

**During Development:**
- [ ] Follow task specifications
- [ ] Test incrementally
- [ ] Document issues
- [ ] Keep user informed

**Completing a Task:**
- [ ] Implementation complete
- [ ] No console errors
- [ ] Responsive design verified
- [ ] Testing instructions provided to user
- [ ] **WAIT for user testing confirmation**
- [ ] Update task status to DONE (only after user confirms)
- [ ] Update changelog in task-management.md
- [ ] Create session log if needed

**Before Session End:**
- [ ] All changes committed/documented
- [ ] Current state clearly described
- [ ] Next steps identified
- [ ] Session log created if quota low

---

**Remember**: The user is the final arbiter of task completion. Your job is to implement, explain, and support—not to declare victory. Always wait for explicit user confirmation before marking any task as DONE.
