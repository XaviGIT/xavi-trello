import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ListContainer } from "./_components/list-container";

interface Props {
    params: {
        boardId: string;
    }
}

const BoardIdPage = async ({ params }: Props) => {
    const { orgId } = auth();

    if (!orgId) {
        redirect("/select-org")
    }

    const list = await db.list.findMany({
        where: {
            boardId: params.boardId,
            board: {
                orgId
            }
        },
        include: {
            cards: {
                orderBy: {
                    order: "asc"
                }
            }
        },
        orderBy: {
            order: "asc"
        }
    })

    return (
        <div className="p-4 h-full overflox-x-auto">
            <ListContainer
                boardId={params.boardId}
                list={list}
            />
        </div>
    )
}

export default BoardIdPage;