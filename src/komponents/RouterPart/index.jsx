import React from 'react'
import {Routes, Route } from 'react-router-dom';


import Home from '../pages/Home'
import OurPlans from'../pages/OurPlans'
import OurMenu from'../pages/OurMenu'
import GiftCards from'../pages/GiftCards'
import ThanksgivingBoxs from'../pages/ThanksgivingBoxs'
import Option1 from '../pages/Sustainability/Option1'
import Option2 from '../pages/Sustainability/Option2'
import Option3 from '../pages/Sustainability/Option3'


const RouterPart = () => {
  const routlar=[
    { id:0, path: "/", element: <Home/> },
    { id:1, path: "/OurPlans", element: <OurPlans/> },
    { id:2, path: "/OurMenu", element: <OurMenu/> },
    { id:3, path: "/GiftCards", element: <GiftCards/> },
    { id:4, path: "/ThanksgivingBoxs", element: <ThanksgivingBoxs/> },
    { id:5, path: "/Sustainability/option1", element: <Option1/> },
    { id:6, path: "/Sustainability/option2", element: <Option2/> },
    { id:7, path: "/Sustainability/option3", element: <Option3/> },
    // Unknown paths (e.g. /login, which has no page yet) show the home page
    { id:8, path: "*", element: <Home/> },
  ]
  return (
    <>
      <Routes>
        {
          routlar.map(({ id, path, element }) => {
            return (
                 <Route key={id} path={path} element={element} />
            );
        })  
        }
      </Routes>
    </>
  )
}

export default RouterPart
