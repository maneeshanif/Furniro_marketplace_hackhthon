import { defineField, defineType } from "sanity";

export const User = defineType({
    name: "user",
    type: "document",
    title: "User",
    fields: [
        defineField({
            name: "name",
            type: "string",
            title: "Name"
        }),

        defineField({
            name: "image",
            type: "image",
            title: "Image"
        }),
        defineField({
            name: "email",
            type: "string",
            title: "Email"
        }),
        defineField({
            name: "password",
            type: "string",
            title: "Password"
        }),
        defineField({
            name:"address",
            type: "string",
            title: "Address"
        }),
        defineField({
            name:"state",
            type: "string",
            title: "State"
        }),
        defineField({
            name:"city",
            type: "string",
            title: "City"
        }),
        defineField({
            name:"zipCode",
            type: "number",
            title: "Zip Code"
        }),
        defineField({
            name:"phone",
            type: "number",
            title: "Phone"
        }),

        defineField({
            name: "orders",
            type: "array",
            of: [{ type: "reference", to: [{ type: "orders" }] }]
        }),

        defineField({
            name: "role",
            type: "string",
            title: "Role",
            initialValue: "user",
            placeholder: "user"
        })

        

    ]
})