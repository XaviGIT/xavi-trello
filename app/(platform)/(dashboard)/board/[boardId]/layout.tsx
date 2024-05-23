import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import { BoardNavBar } from "./_components/board-navbar";

interface MetadataProps {
    params: { boardId: string }
}

export async function generateMetadata({
    params
}: MetadataProps) {
    const { orgId } = auth();

    if (!orgId) {
        return {
            title: "Board"
        }
    }

    const board = await db.board.findUnique({
        where: {
            id: params.boardId,
            orgId
        }
    })

    return {
        title: board?.title || "Board"
    }
}

interface Props {
    children: React.ReactNode;
    params: { boardId: string }
}

const BoardIdLayout = async ({ children, params }: Props) => {
    const { orgId } = auth();

    if (!orgId) {
        redirect("/select-org")
    }

    const board = await db.board.findUnique({
        where: {
            id: params.boardId,
            orgId
        }
    })

    if (!board) {
        notFound();
    }

    return (
        <div
            className="relative h-full bg-no-repeat bg-cover bg-center"
            style={{ backgroundImage: `url(${board.imageFullUrl})` }}
        >
            <BoardNavBar board={board} />
            <div className="absolute inset-0 bg-black/10" />
            <main className="relative pt-28 h-full">
                {children}
            </main>
        </div>
    )
}

export default BoardIdLayout;