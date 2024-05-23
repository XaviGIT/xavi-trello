"use client"

import { ListWithCards } from "@/types";
import { ListForm } from "./list-form";
import { useEffect, useState } from "react";
import { ListItem } from "./list-item";

interface Props {
    list: ListWithCards[];
    boardId: string;
}

export const ListContainer = ({ list, boardId }: Props) => {
    const [orderedList, setOrderedList] = useState(list)

    useEffect(() => {
        setOrderedList(list);
    }, [list]);

    return (
        <ol className="flex gap-x-3 h-full">
            {orderedList.map((list, index) => {
                return (
                    <ListItem
                        key={list.id}
                        index={index}
                        data={list}
                    />
                )
            })}
            <ListForm />
            <div className="flex-shrink-0 w-1"/>
        </ol>
    )

}