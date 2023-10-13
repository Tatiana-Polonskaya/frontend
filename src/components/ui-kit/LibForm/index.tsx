import { useForm } from "react-hook-form";

export default function LibForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm({
        mode: "onChange",
        defaultValues: { username: "", password: "", age: 0 },
    });

    const onSubmit = (data: any) => {
        console.log("onSubmit", data);
        console.log("getValues", getValues());
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    {...register("username", {
                        required: true,
                        minLength: 8,
                        pattern: undefined,
                    })}
                />
                {errors.username && <p>Last username is uncorrect.</p>}
                <input {...register("password", { required: true })} />
                {errors.password && <p>Last name is required.</p>}
                <input {...register("age", { pattern: /\d+/ })} />
                {errors.age && <p>Please enter number for email.</p>}
                <input type="submit" />
            </form>
        </>
    );
}
