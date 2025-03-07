# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


{
  "menu": [
    {
      "id": 1,
      "title": "Makarna",
      "ingredients": ["Makarna", "Domates Sosu", "Sarımsak", "Zeytinyağı", "Peynir"],
      "shapes": [
        {"image_url": "https://example.com/shape1_1.jpg", "width": 300, "height": 300},
        {"image_url": "https://example.com/shape1_2.jpg", "width": 300, "height": 300},
        {"image_url": "https://example.com/shape1_3.jpg", "width": 300, "height": 300},
        {"image_url": "https://example.com/shape1_4.jpg", "width": 300, "height": 300},
        {"image_url": "https://example.com/shape1_5.jpg", "width": 300, "height": 300}
      ],
      "rating": 4.5,
      "category": "hot yemekler",
      "price": 20.00,
      "note": "Çok lezzetli ve doyurucu bir seçenek."
    },
    {
      "id": 2,
      "title": "Fırın Tavuk",
      "ingredients": ["Tavuk", "Zeytinyağı", "Baharatlar", "Patates"],
      "shapes": [
        {"image_url": "https://example.com/shape2_1.jpg", "width": 300, "height": 300},
        {"image_url": "https://example.com/shape2_2.jpg", "width": 300, "height": 300},
        {"image_url": "https://example.com/shape2_3.jpg", "width": 300, "height": 300},
        {"image_url": "https://example.com/shape2_4.jpg", "width": 300, "height": 300},
        {"image_url": "https://example.com/shape2_5.jpg", "width": 300, "height": 300}
      ],
      "rating": 4.8,
      "category": "hot yemekler",
      "price": 35.00,
      "note": "Fırında yumuşacık ve lezzetli tavuk."
    },
    {
      "id": 3,
      "title": "Caesar Salata",
      "ingredients": ["Marulları", "Tavuk", "Parmesan Peyniri", "Caesar Sos"],
      "shapes": [
        {"image_url": "https://example.com/shape3_1.jpg", "width": 300, "height": 300},
        {"image_url": "https://example.com/shape3_2.jpg", "width": 300, "height": 300},
        {"image_url": "https://example.com/shape3_3.jpg", "width": 300, "height": 300},
        {"image_url": "https://example.com/shape3_4.jpg", "width": 300, "height": 300},
        {"image_url": "https://example.com/shape3_5.jpg", "width": 300, "height": 300}
      ],
      "rating": 4.2,
      "category": "cold yemekler",
      "price": 15.00,
      "note": "Taze ve hafif bir salata."
    },
    {
      "id": 4,
      "title": "Soğuk Ayran",
      "ingredients": ["Süt", "Yoğurt", "Tuz"],
      "shapes": [
        {"image_url": "https://example.com/shape4_1.jpg", "width": 300, "height": 300},
        {"image_url": "https://example.com/shape4_2.jpg", "width": 300, "height": 300},
        {"image_url": "https://example.com/shape4_3.jpg", "width": 300, "height": 300},
        {"image_url": "https://example.com/shape4_4.jpg", "width": 300, "height": 300},
        {"image_url": "https://example.com/shape4_5.jpg", "width": 300, "height": 300}
      ],
      "rating": 4.7,
      "category": "drinks",
      "price": 5.00,
      "note": "Serinletici ve sağlıklı bir içecek."
    },
    {
      "id": 5,
      "title": "Buzlu Çay",
      "ingredients": ["Çay", "Şeker", "Limon"],
      "shapes": [
        {"image_url": "https://example.com/shape5_1.jpg", "width": 300, "height": 300},
        {"image_url": "https://example.com/shape5_2.jpg", "width": 300, "height": 300},
        {"image_url": "https://example.com/shape5_3.jpg", "width": 300, "height": 300},
        {"image_url": "https://example.com/shape5_4.jpg", "width": 300, "height": 300},
        {"image_url": "https://example.com/shape5_5.jpg", "width": 300, "height": 300}
      ],
      "rating": 4.0,
      "category": "drinks",
      "price": 4.00,
      "note": "Buzlu ve ferahlatıcı bir içecek."
    },
    {
      "id": 6,
      "title": "Pizza Margherita",
      "ingredients": ["Domates Sosu", "Mozzarella", "Fesleğen", "Zeytinyağı"],
      "shapes": [
        {"image_url": "https://example.com/shape6_1.jpg", "width": 300, "height": 300},
        {"image_url": "https://example.com/shape6_2.jpg", "width": 300, "height": 300},
        {"image_url": "https://example.com/shape6_3.jpg", "width": 300, "height": 300},
        {"image_url": "https://example.com/shape6_4.jpg", "width": 300, "height": 300},
        {"image_url": "https://example.com/shape6_5.jpg", "width": 300, "height": 300}
      ],
      "rating": 4.6,
      "category": "hot yemekler",
      "price": 22.00,
      "note": "İtalyan pizzası, hafif ve lezzetli."
    },
    {
      "id": 7,
      "title": "Köfte",
      "ingredients": ["Dana Kıyma", "Soğan", "Baharatlar", "Ekşi Sos"],
      "shapes": [
        {"image_url": "https://example.com/shape7_1.jpg", "width": 300, "height": 300},
        {"image_url": "https://example.com/shape7_2.jpg", "width": 300, "height": 300},
        {"image_url": "https://example.com/shape7_3.jpg", "width": 300, "height": 300},
        {"image_url": "https://example.com/shape7_4.jpg", "width": 300, "height": 300},
        {"image_url": "https://example.com/shape7_5.jpg", "width": 300, "height": 300}
      ],
      "rating": 4.3,
      "category": "hot yemekler",
      "price": 18.00,
      "note": "Ev yapımı, lezzetli köfteler."
    },
    {
      "id": 8,
      "title": "Kumpir",
      "ingredients": ["Patates", "Mozzarella", "Zeytin", "Mısır", "Sosis"],
      "shapes": [
        {"image_url": "https://example.com/shape8_1.jpg", "width": 300, "height": 300},
        {"image_url": "https://example.com/shape8_2.jpg", "width": 300, "height": 300},
        {"image_url": "https://example.com/shape8_3.jpg", "width": 300, "height": 300},
        {"image_url": "https://example.com/shape8_4.jpg", "width": 300, "height": 300},
        {"image_url": "https://example.com/shape8_5.jpg", "width": 300, "height": 300}
      ],
      "rating": 4.7,
      "category": "hot yemekler",
      "price": 25.00,
      "note": "Yumuşacık patates, zengin malzemelerle."
    },
    {
      "id": 9,
      "title": "Börek",
      "ingredients": ["Yufka", "Beyaz Peynir", "Maydanoz", "Zeytinyağı"],
      "shapes": [
        {"image_url": "https://example.com/shape9_1.jpg", "width": 300, "height": 300},
        {"image_url": "https://example.com/shape9_2.jpg", "width": 300, "height": 300},
        {"image_url": "https://example.com/shape9_3.jpg", "width": 300, "height": 300},
        {"image_url": "https://example.com/shape9_4.jpg", "width": 300, "height": 300},
        {"image_url": "https://example.com/shape9_5.jpg", "width": 300, "height": 300}
      ],
      "rating": 4.4,
      "category": "hot yemekler",
      "price": 12.00,
      "note": "Fırında çıtır çıtır, nefis bir atıştırmalık."
    },
    {
      "id": 10,
      "title": "Mercimek Çorbası",
      "ingredients": ["Mercimek", "Soğan", "Havuç", "Zeytinyağı", "Baharatlar"],
      "shapes": [
        {"image_url": "https://example.com/shape10_1.jpg", "width": 300, "height": 300},
        {"image_url": "https://example.com/shape10_2.jpg", "width": 300, "height": 300},
        {"image_url": "https://example.com/shape10_3.jpg", "width": 300, "height": 300},
        {"image_url": "https://example.com/shape10_4.jpg", "width": 300, "height": 300},
        {"image_url": "https://example.com/shape10_5.jpg", "width": 300, "height": 300}
      ],
      "rating": 4.5,
      "category": "hot yemekler",
      "price": 10.00,
      "note": "Vitamin deposu, besleyici çorba."
    },
    {
      "id": 11,
      "title": "Tavuklu Sandviç",
      "ingredients": ["Tavuk", "Marul", "Mayonez", "Ekme"],
      "shapes": [
        {"image_url": "https://example.com/shape11_1.jpg", "width": 300, "height": 300},
        {"image_url": "https://example.com/shape11_2.jpg", "width": 300, "height": 300},
        {"image_url": "https://example.com/shape11_3.jpg", "width": 300, "height": 300},
        {"image_url": "https://example.com/shape11_4.jpg", "width": 300, "height": 300},
        {"image_url": "https://example.com/shape11_5.jpg", "width": 300, "height": 300}
      ],
      "rating": 4.6,
      "category": "hot yemekler",
      "price": 18.00,
      "note": "Lezzetli ve doyurucu."
    },
    {
      "id": 12,
      "title": "Salata",
      "ingredients": ["Marul", "Domates", "Salatalık", "Zeytinyağı", "Sirkeli Sos"],
      "shapes": [
        {"image_url": "https://example.com/shape12_1.jpg", "width": 300, "height": 300},
        {"image_url": "https://example.com/shape12_2.jpg", "width": 300, "height": 300},
        {"image_url": "https://example.com/shape12_3.jpg", "width": 300, "height": 300},
        {"image_url": "https://example.com/shape12_4.jpg", "width": 300, "height": 300},
        {"image_url": "https://example.com/shape12_5.jpg", "width": 300, "height": 300}
      ],
      "rating": 4.3,
      "category": "cold yemekler",
      "price": 10.00,
      "note": "Taze ve sağlıklı bir başlangıç."
    },
    {
      "id": 13,
      "title": "Tatlı Çörek",
      "ingredients": ["Hamur", "Şeker", "Tarçın", "Peynir"],
      "shapes": [
        {"image_url": "https://example.com/shape13_1.jpg", "width": 300, "height": 300},
        {"image_url": "https://example.com/shape13_2.jpg", "width": 300, "height": 300},
        {"image_url": "https://example.com/shape13_3.jpg", "width": 300, "height": 300},
        {"image_url": "https://example.com/shape13_4.jpg", "width": 300, "height": 300},
        {"image_url": "https://example.com/shape13_5.jpg", "width": 300, "height": 300}
      ],
      "rating": 4.7,
      "category": "hot yemekler",
      "price": 8.00,
      "note": "Tatlı krizine birebir."
    },
    {
      "id": 14,
      "title": "Zeytinyağlı Enginar",
      "ingredients": ["Enginar", "Zeytinyağı", "Limon", "Baharatlar"],
      "shapes": [
        {"image_url": "https://example.com/shape14_1.jpg", "width": 300, "height": 300},
        {"image_url": "https://example.com/shape14_2.jpg", "width": 300, "height": 300},
        {"image_url": "https://example.com/shape14_3.jpg", "width": 300, "height": 300},
        {"image_url": "https://example.com/shape14_4.jpg", "width": 300, "height": 300},
        {"image_url": "https://example.com/shape14_5.jpg", "width": 300, "height": 300}
      ],
      "rating": 4.8,
      "category": "cold yemekler",
      "price": 12.00,
      "note": "Sağlıklı ve lezzetli."
    },
    {
      "id": 15,
      "title": "Yoğurtlu Kabak Salatası",
      "ingredients": ["Kabak", "Yoğurt", "Sarımsak", "Maydanoz"],
      "shapes": [
        {"image_url": "https://example.com/shape15_1.jpg", "width": 300, "height": 300},
        {"image_url": "https://example.com/shape15_2.jpg", "width": 300, "height": 300},
        {"image_url": "https://example.com/shape15_3.jpg", "width": 300, "height": 300},
        {"image_url": "https://example.com/shape15_4.jpg", "width": 300, "height": 300},
        {"image_url": "https://example.com/shape15_5.jpg", "width": 300, "height": 300}
      ],
      "rating": 4.3,
      "category": "cold yemekler",
      "price": 14.00,
      "note": "Hafif ve sağlıklı."
    },
    {
      "id": 16,
      "title": "Açma",
      "ingredients": ["Un", "Şeker", "Yumurta", "Mayalı Hamur"],
      "shapes": [
        {"image_url": "https://example.com/shape16_1.jpg", "width": 300, "height": 300},
        {"image_url": "https://example.com/shape16_2.jpg", "width": 300, "height": 300},
        {"image_url": "https://example.com/shape16_3.jpg", "width": 300, "height": 300},
        {"image_url": "https://example.com/shape16_4.jpg", "width": 300, "height": 300},
        {"image_url": "https://example.com/shape16_5.jpg", "width": 300, "height": 300}
      ],
      "rating": 4.5,
      "category": "hot yemekler",
      "price": 6.00,
      "note": "Lezzetli ve yumuşacık."
    },
    {
      "id": 17,
      "title": "Çikolatalı Kek",
      "ingredients": ["Un", "Şeker", "Çikolata", "Yumurta"],
      "shapes": [
        {"image_url": "https://example.com/shape17_1.jpg", "width": 300, "height": 300},
        {"image_url": "https://example.com/shape17_2.jpg", "width": 300, "height": 300},
        {"image_url": "https://example.com/shape17_3.jpg", "width": 300, "height": 300},
        {"image_url": "https://example.com/shape17_4.jpg", "width": 300, "height": 300},
        {"image_url": "https://example.com/shape17_5.jpg", "width": 300, "height": 300}
      ],
      "rating": 4.9,
      "category": "sweet",
      "price": 9.00,
      "note": "Tatlı sevenler için mükemmel."
    },
    {
      "id": 18,
      "title": "Şehriye Çorbası",
      "ingredients": ["Şehriye", "Tuz", "Su", "Sarımsak"],
      "shapes": [
        {"image_url": "https://example.com/shape18_1.jpg", "width": 300, "height": 300},
        {"image_url": "https://example.com/shape18_2.jpg", "width": 300, "height": 300},
        {"image_url": "https://example.com/shape18_3.jpg", "width": 300, "height": 300},
        {"image_url": "https://example.com/shape18_4.jpg", "width": 300, "height": 300},
        {"image_url": "https://example.com/shape18_5.jpg", "width": 300, "height": 300}
      ],
      "rating": 4.0,
      "category": "hot yemekler",
      "price": 7.00,
      "note": "Kolay ve lezzetli çorba."
    },
    {
      "id": 19,
      "title": "Fırında Sebze",
      "ingredients": ["Havuç", "Patates", "Brokoli", "Zeytinyağı", "Baharatlar"],
      "shapes": [
        {"image_url": "https://example.com/shape19_1.jpg", "width": 300, "height": 300},
        {"image_url": "https://example.com/shape19_2.jpg", "width": 300, "height": 300},
        {"image_url": "https://example.com/shape19_3.jpg", "width": 300, "height": 300},
        {"image_url": "https://example.com/shape19_4.jpg", "width": 300, "height": 300},
        {"image_url": "https://example.com/shape19_5.jpg", "width": 300, "height": 300}
      ],
      "rating": 4.2,
      "category": "hot yemekler",
      "price": 12.00,
      "note": "Lezzetli ve sağlıklı."
    },
    {
      "id": 20,
      "title": "Çılgın Burger",
      "ingredients": ["Ekmek", "Burger Eti", "Cheddar", "Marul", "Ketçap"],
      "shapes": [
        {"image_url": "https://example.com/shape20_1.jpg", "width": 300, "height": 300},
        {"image_url": "https://example.com/shape20_2.jpg", "width": 300, "height": 300},
        {"image_url": "https://example.com/shape20_3.jpg", "width": 300, "height": 300},
        {"image_url": "https://example.com/shape20_4.jpg", "width": 300, "height": 300},
        {"image_url": "https://example.com/shape20_5.jpg", "width": 300, "height": 300}
      ],
      "rating": 4.7,
      "category": "hot yemekler",
      "price": 18.00,
      "note": "Büyük ve doyurucu."
    }
  ]
}
