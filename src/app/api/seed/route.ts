import { NextResponse } from "next/server";
import { supabase } from "@/library/supabase";
import { mockArtisans, mockProducts } from "@/library/mock-data";

export async function POST() {
    try {
        await supabase.from("products").delete().neq("id", "");
        await supabase.from("artisans").delete().neq("id", "");

        const { error: artisanError } = await supabase
        .from("artisans")
        .insert(mockArtisans);

        if (artisanError) throw artisanError;

        const { error: productError } = await supabase
            .from("products")
            .insert(mockProducts);

        if (productError) throw productError;

        return NextResponse.json({
            message: "Database seeded successfully 🌱",
        });
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Seeding failed";
        return NextResponse.json(
            { error: errorMessage },
            { status: 500 }
        );
    }
}
