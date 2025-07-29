export type Status = "todo" | "in-progress" | "done";

export type Task = {
  id: string;
  title: string;
  dueDate: string; // yyyy‑mm‑dd
  tag?: "Work" | "Personal" | "Urgent";
  status: Status;
};

export const tasksMock: Task[] = [
  {
    id: "1",
    title: "Design sidebar",
    dueDate: "2025-07-27",
    status: "todo",
    tag: "Work",
  },
  {
    id: "2",
    title: "Write API docs",
    dueDate: "2025-07-28",
    status: "in-progress",
    tag: "Personal",
  },
  {
    id: "3",
    title: "Deploy preview",
    dueDate: "2025-07-29",
    status: "done",
    tag: "Urgent",
  },
];
