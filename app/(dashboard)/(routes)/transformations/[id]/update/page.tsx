import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Heading from "@/components/header";
import TransformationForm from "@/components/transformation-form";
import { transformationTypes } from "@/constants";
import { getUserById } from "@/lib/actions/user.actions";
import { getImageById } from "@/lib/actions/image.actions";

const UpdatePage = async ({ params: { id } }: SearchParamProps) => {
    const { userId } = auth();

    if (!userId) redirect("/sign-in");

    const user = await getUserById(userId);
    const image = await getImageById(id);

    const transformation =
        transformationTypes[image.transformationType as TransformationTypeKey];

    return (
        <>
            <Heading
                title={transformation.title}
                description={transformation.subTitle}
                icon={transformation.icon}
                iconColor={transformation.color}
                bgColor={transformation.bgColor}
            />

            <section className="px-4 lg:px-8">
                <TransformationForm
                    action="Update"
                    userId={user._id}
                    type={image.transformationType as TransformationTypeKey}
                    creditBalance={user.creditBalance}
                    config={image.config}
                    data={image}
                />
            </section>
        </>
    );
};

export default UpdatePage;
