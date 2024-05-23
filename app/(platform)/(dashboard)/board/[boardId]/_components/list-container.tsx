"use client"

import { ListWithCards } from "@/types";
import { ListForm } from "./list-form";
import { useEffect, useState } from "react";
import { ListItem } from "./list-item";

import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { useAction } from "@/hooks/use-action";
import { updateListOrder } from "@/actions/update-list-order";
import { toast } from "sonner";
import { updateCardOrder } from "@/actions/update-card-order";

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
}

interface Props {
    list: ListWithCards[];
    boardId: string;
}

export const ListContainer = ({ list, boardId }: Props) => {
    const [orderedList, setOrderedList] = useState(list)

    useEffect(() => {
        setOrderedList(list);
    }, [list]);

    const { execute: executeUpdateListOrder } = useAction(updateListOrder, {
        onSuccess: () => {
            toast.success("Reordered list")
        },
        onError: (error) => {
            toast.error(error)
        }
    })

    const { execute: executeUpdateCardOrder } = useAction(updateCardOrder, {
        onSuccess: () => {
            toast.success("Reordered cards")
        },
        onError: (error) => {
            toast.error(error)
        }
    })

    const onDragEnd = (result: any) => {
        const { destination, source, type } = result;

        if (!destination) {
            return;
        }

        // dropped on same position
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        // moving a list
        if (type === "list") {
            const items = reorder(orderedList, source.index, destination.index).map((item, index) => (
                {...item, order: index}
            ))

            setOrderedList(items);
            executeUpdateListOrder({ items, boardId })
        }

        // moving a card
        if (type === "card") {
            const newOrderList = [...orderedList];

            const sourceList = newOrderList.find(list => list.id === source.droppableId);
            const destList = newOrderList.find(list => list.id === destination.droppableId);

            if (!sourceList || !destList) {
                return;
            }

            if (!sourceList.cards) {
                sourceList.cards = [];
            }

            if (!destList.cards) {
                destList.cards = [];
            }

            // moving card on same list
            if (source.droppableId === destination.droppableId) {
                const reorderedCards = reorder(sourceList.cards, source.index, destination.index);
                reorderedCards.forEach((card, index) => {
                    card.order = index;
                })

                sourceList.cards = reorderedCards;

                setOrderedList(orderedList);
                executeUpdateCardOrder({ items: reorderedCards, boardId })
            }

            // moving card to another list
            if (source.droppableId !== destination.droppableId) {
                const [movedCard] = sourceList.cards.splice(source.index, 1);
                movedCard.listId = destination.droppableId;
                destList.cards.splice(destination.index, 0, movedCard);

                sourceList.cards.forEach((card, index) => {
                    card.order = index;
                })

                destList.cards.forEach((card, index) => {
                    card.order = index
                });

                setOrderedList(orderedList);
                executeUpdateCardOrder({ items: destList.cards, boardId })
            }
        }
    }

    return (
        <DragDropContext
            onDragEnd={onDragEnd}
        >
            <Droppable droppableId="lists" type="list" direction="horizontal">
                {(provided) => (
                    <ol
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="flex gap-x-3 h-full"
                    >
                        {orderedList.map((list, index) => {
                            return (
                                <ListItem
                                    key={list.id}
                                    index={index}
                                    data={list}
                                />
                            )
                        })}
                        {provided.placeholder}
                        <ListForm />
                        <div className="flex-shrink-0 w-1"/>
                    </ol>
                )}
            </Droppable>
        </DragDropContext>
    )

}