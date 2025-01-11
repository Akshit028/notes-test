import { AddCategory } from "@/components/add-category"
import { CategoryList } from "@/components/category-list"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function CategoryPage() {
    const session = await auth()
    if (!session?.user) {
        redirect("/")
    }

    return (
        <div className="space-y-4">
            <AddCategory />
            <CategoryList />
        </div>
    )
}