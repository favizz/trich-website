export const handleRewardMatch = (promo_query, obj_query, obj_price) => {
    if (obj_query === null || obj_price === null) {
        return 0;
    }
    if (!promo_query) {
        return obj_price;
    }
    if (promo_query === "H3e5LrxK2R" && obj_query === promo_query)  { // free the trich experience
        return 0;
    }
    else if (promo_query === "w62jI0Zzbk" && obj_query === promo_query) { // 50% small service
        return obj_price / 2;
    }
    else if (promo_query === "5J8qcc6ahu" && obj_query === "w62jI0Zzbk") { // free small service
        return 0;
    }
    else {
        return obj_price;
    }
}

export const Services = [
    {
        is_list: false,
        name: "Morning Edge",
        price: "32.500",
        nominal: 32500,
        actual_price: 65000,
        duration: 1,
        is_promo: true,
        services: [],
        is_range: false,
        query_code: "",
    },
    {
        is_list: false,
        name: "The Trich Experience",
        price: "67.500",
        nominal: 67500,
        actual_price: 135000,
        duration: 2,
        is_promo: false,
        services: [],
        is_range: false,
        query_code: "H3e5LrxK2R",
    },
    {
        is_list: false,
        name: "The Cutting Edge",
        price: "42.500",
        nominal: 42500,
        actual_price: 85000,
        duration: 1,
        is_promo: false,
        services: [],
        is_range: false,
        query_code: "",
    },
    {
        is_list: false,
        name: "Korean Perm",
        price: "100.000",
        nominal: 100000,
        actual_price: 250000,
        duration: 1.5,
        is_promo: true,
        services: [],
        is_range: false,
        query_code: "",
    },
    {
        is_list: false,
        name: "Root Lift",
        price: "100.000",
        nominal: 100000,
        actual_price: 150000,
        duration: 1.5,
        is_promo: false,
        services: [],
        is_range: false,
        query_code: "",
    },
    {
        is_list: false,
        name: "Down Perm",
        price: "100.000",
        nominal: 100000,
        actual_price: 150000,
        duration: 1.5,
        is_promo: false,
        services: [],
        is_range: false,
        query_code: "",
    },
    // {
    //   is_list: true,
    //   name: "Permification",
    //   is_promo: true,
    //   is_range:true,
    //   services: [
    //     {
    //       name: "Permification - Classic",
    //       price: "100.000",
    //       nominal: 100000,
    //       actual_price: "250.000-750.000",
    //       duration: 2,
    //       is_promo: false,
    //       query_code: "",
    //     },
        // {
        //   name: "Permification - Root Lift",
        //   price: "100.000",
        //   nominal: 75000,
        //   actual_price: 150000,
        //   duration: 0.75,
        //   is_promo: false,
        //   query_code: "",
        // },
        // {
        //   name: "Permification - Down",
        //   price: "100.000",
        //   nominal: 75000,
        //   actual_price: 150000,
        //   duration: 0.75,
        //   is_promo: false,
        //   query_code: "",
        // },
    //   ],
    // },
    // {
    //   is_list: true,
    //   name: "True Colors",
    //   is_promo: true,
    //   is_range:true,
    //   services: [
    //     {
    //       name: "Full Colors",
    //       price: "100.000",
    //       nominal: 100000,
    //       actual_price: "250.000-750.000",
    //       duration: 3,
    //       is_promo: false,
            // query_code: "",
    //     },
    //     {
    //       name: "Highlight Colors",
    //       price: "100.000",
    //       nominal: 100000,
    //       actual_price: "250.000-750.000",
    //       duration: 3,
    //       is_promo: false,
    //       query_code: "",
    //     },
    //   ],
    // },
    // {
    //   is_list: false,
    //   name: "Smooth Operator",
    //   price: "100.000",
    //   nominal: 100000,
    //   actual_price: "250.000-750.000",
    //   duration: 2,
    //   is_promo: false,
    //   services: [],
    //   is_range:true,
    //   query_code: "",
    // },
    {
        is_list: false,
        name: "Trim & Treat",
        price: "17.500",
        nominal: 17500,
        actual_price: 35000,
        duration: 0.5,
        is_promo: false,
        services: [],
        is_range: false,
        query_code: "w62jI0Zzbk",
    },
    {
        is_list: false,
        name: "Mask Off",
        price: "17.500",
        nominal: 17500,
        actual_price: 35000,
        duration: 0.5,
        is_promo: false,
        services: [],
        is_range: false,
        query_code: "w62jI0Zzbk",
    },
    {
        is_list: false,
        name: "Creambath",
        price: "17.500",
        nominal: 17500,
        actual_price: 35000,
        duration: 0.5,
        is_promo: false,
        services: [],
        is_range: false,
        query_code: "w62jI0Zzbk",
    },
];
