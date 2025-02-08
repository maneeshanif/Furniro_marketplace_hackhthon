import { defineField, defineType } from "sanity";

export const orders = defineType({
    name: "orders",
    type: "document",
    title: "Orders",
    fields: [
        defineField({
            name: "customer",
            type: "reference",
            to: [{type: "user"}],
            title: "Customer"
        }),
        defineField({
            name: "product",
            type: "array",
            of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'product',
                      type: 'reference',
                      to: [{ type: 'product' }]
                    },
                    {
                      name: 'quantity',
                      type: 'number'
                    },
                    {
                      name: "size",
                      title: "Size",
                      type: "string"
                    }
                  ]
                }
              ]
        }),
        defineField({
            name: "status",
            type: "string",
            options: {
                list: [
                    {title: "Pending",value: "pending"},
                    {title: "Shipped",value: "shipped"},
                    {title: "Delivered",value: "delivered"},
                    {title: "Returned",value: "returned"},
                ]
            }
        }),

        defineField({
          name: "address",
          title: "Address",
          type: "string"
        }),
        defineField({
          name: "city",
          title: "City",
          type: "string"
        }),
        defineField({
          name: "state",
          title: "State",
          type: "string"
        }),
        defineField({
          name: "postalCode",
          title: "Postal Code",
          type: "string"
        }),
        defineField({
          name: "country",
          title: "Country",
          type: "string"
        }),

        defineField({ 

          name: "total",
          title: "Total",
          type: "number"
        } )
  
    ]
});