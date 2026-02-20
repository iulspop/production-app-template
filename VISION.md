# iTalk

A coaching and therapy PWA that teaches people how to think, not what to think. Coaches guide clients through structured thinking sessions using the iTalk method. The app holds the structure so both coach and client can focus on the thinking.

## Goals

- Give coaches a digital instrument for running iTalk sessions on mobile.
- Implement the full iTalk Session Grammar: Trigger -> Path -> Resolution.
- Support all four form types (waterflow, grid, chain, action) and three accents (freeform, guide, fill).
- Enable real-time coach-client collaboration through video calls and shared editing.
- Work as an iOS Safari PWA first, desktop second.

## Non-Goals

- Not a self-help app. Requires a coach. No autonomous AI therapy.
- Not a note-taking app. The grammar defines the structure. Users don't create freeform documents.
- Not a scheduling or billing platform. Session management only covers the thinking work itself.
- No native iOS or Android app. PWA only.

## Key Constraints

KeyConstraints {
  Must run as an iOS Safari PWA. Every feature must work in PWA mode.
  React Router (framework mode) with TailwindCSS. Not Next.js.
  Mobile-first. Desktop is secondary.
  Accents live at the stop level, not the form level. Different stops in the same form can have different accents.
  All four form types render inside one shared MobileFormShell component.
  Sessions are event-sourced. `SessionAction[]` derives `SessionState`. No mutable state objects.
}

## Architectural Decisions

ArchitecturalDecisions {
  EventSourcedSessionStateMachine {
    Sessions store a history of actions and derive state from them.
    Enables undo, replay, and nested sessions without complex state management.
    Actions: `next | back | insert(Step) | remove(at) | resolve | drop`.
  }

  PlansVsSessions {
    Plans are templates (prescriptions). Sessions are instances (practice).
    A coach creates a Plan. Each time a client works through it, that's a Session.
  }

  NestedSessions {
    A Step can contain a full Session. Recursion is part of the grammar.
    Lets coaches compose complex paths from simpler building blocks.
  }

  OneShellFourFormTypes {
    All forms share a single MobileFormShell with header, progress rail, stop content area, and navigation.
    Each form type only defines how its stop content renders.
  }

  YjsCRDTForCollaboration {
    Coach and client edit the same session simultaneously during video calls.
    Yjs handles conflict resolution without a central authority.
  }
}

## The iTalk Session Grammar

```
Session  := Trigger -> Path -> Resolution
Path     := FormsPath | CardGamePath
FormsPath := Step+
Step     := Move(tool + accent) | Form(form + accent) | Session(nested)
```

### Tools

Thinking instruments. Each tool has a specific cognitive purpose.

Tools {
  iTalk        — Structured self-expression (waterflow form).
  STAC         — Stock, Trigger, Acquisition, Creation cycle (waterflow form, S/T/A/C variant).
  ThinkingChain — Linked STAC cycles that build on each other (chain form).
  LayerBox     — Multi-dimensional analysis across 9 categories (grid form).
  MicroMap     — Compact mapping of a thinking space (waterflow form).
  xNova        — Action planning through numbered links and themes (action form).
  ZeroPoint    — Starting-point exercises.
  KnowledgeDecomposer — Breaking complex knowledge into parts.
}

### Forms

Visual containers that tools render into.

Forms {
  Waterflow — 9 columns + summary + wisdom. One column per stop. Title, content, and summary stacked vertically.
  Grid      — 9 subject columns x 9 category rows. One subject per stop. Categories stacked vertically within.
  Chain     — N linked STAC cycles. One cycle per stop in a 2x2 layout (Stock / Trigger / Acquisition / Creation). Completing the last Creation auto-adds a new cycle.
  Action    — N action links. One link per stop. 3 numbered content areas + theme field.
}

### Accents

Accents transform how the client interacts at each stop.

Accents {
  Freeform — Client writes freely. AI witnesses but doesn't intervene. Empty textarea, neutral styling.
  Guide    — AI prompts the client with a question or direction. Client responds. Warm/ochre accent. Advances only when answered.
  Fill     — AI generates prose for the client to read and optionally edit. Soft green accent. Read-first, edit on demand.
}

## User Experience

UXPrinciples {
  CalmAndSpacious — This is a thinking environment, not a productivity tool. The interface recedes so the client's thinking stays in the foreground.
  GentleTransitions — 200-300ms. No jarring cuts. Interstitials between steps give the thinker a breath.
  MobileRailNavigation — One stop at a time. Swipe left/right within a form, up/down between steps. The coach's structure guides the client forward.
  DesktopFlexibility — Rails mode (single-stop, 600px centered) for guided work. Overview mode (all columns visible) for freeform exploration.
  FigmaIsSourceOfTruth — Refer to the Figma mood board and design system for visual language, color tokens, typography, and component patterns.
}

## Features (priority order)

Features {
  1. SessionEngine — State machine. Plans vs Sessions. Nested sessions. Cursor tracking. Action dispatch.
  2. DesignSystem — Implemented with Storybook boards. Component library, color tokens, typography, spacing.
  3. MobileFormShell — Shared navigation container for all form types.
  4. FourFormTypes — Waterflow, grid, chain, action. Each renders inside the shell.
  5. AccentSystem — Freeform, guide, fill. Transforms interaction per stop.
  6. DesktopMode — Rails/overview toggle.
  7. SpeechToText — Voice dictation into any textarea. Web Speech API. iOS Safari compatible.
  8. VideoSessions — WebRTC call between coach and client. Collaborative editing via Yjs CRDT. Voice-to-document transcription labeled by speaker.
  9. PathManagement — Create/manage path templates. CardGamePath type. Session history dashboard.
  10. PWAOptimization — Manifest, service worker, offline support, iOS splash screens, install prompts.
  11. MultiLanguage — i18n for all UI strings. RTL support. Language picker.
}

## Success Criteria

SuccessCriteria {
  A coach can create a Plan with multiple steps, each using a different tool/form/accent combination.
  A client can work through a Session on iOS Safari PWA, navigating stops via swipe and buttons.
  All four form types render correctly inside the shared MobileFormShell.
  Accents change per-stop and transform the interaction as specified.
  Coach and client can join a video call and edit the same session simultaneously.
  Voice dictation works in iOS Safari PWA mode.
  The app works offline after initial load.
}
