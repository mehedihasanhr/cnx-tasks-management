"use client";

import {
  KanbanBoard,
  KanbanBoardColumn,
  KanbanBoardItem,
} from "@/components/kanban-board";
import { DragEndEvent, DragOverEvent } from "@dnd-kit/core";
import _ from "lodash";
import React from "react";

export type CardType = {
  id: string;
  title: string;
};

export type ColumnType = {
  id: string;
  title: string;
  cards: CardType[];
};

const data: ColumnType[] = [
  {
    id: "Column1",
    title: "Column1",
    cards: [
      {
        id: "Card1",
        title: "Card1",
      },
      {
        id: "Card2",
        title: "Card2",
      },
    ],
  },
  {
    id: "Column2",
    title: "Column2",
    cards: [
      {
        id: "Card3",
        title: "Card3",
      },
      {
        id: "Card4",
        title: "Card4",
      },
    ],
  },
];

export default function TaskBoard() {
  const [columns] = React.useState<ColumnType[]>(data);

  // eslint-disable-next-line consistent-return
  const handleDragOver = (event: DragOverEvent) => {
    // eslint-disable-next-line no-console
    console.log({ event });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    // eslint-disable-next-line no-console
    console.log("DragEnd: ", event);
  };

  return (
    <KanbanBoard onDragEnd={handleDragEnd} onDragOver={handleDragOver}>
      {_.map(columns, (col) => (
        <KanbanBoardColumn key={col.id} columnId={col.id} items={col.cards}>
          {_.map(col.cards, (card) => (
            <KanbanBoardItem id={card?.id}>
              <div>
                <h2>{card?.title}</h2>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Libero omnis possimus repudiandae.
                </p>
              </div>
            </KanbanBoardItem>
          ))}
        </KanbanBoardColumn>
      ))}
    </KanbanBoard>
  );
}
