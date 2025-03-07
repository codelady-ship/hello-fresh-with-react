import React from 'react'
import {Routes, Route } from 'react-router-dom'; // React Router v5-də


import OurPlans from'../pages/OurPlans'
import HowItWorks from'../pages/OurMenu'
import GiftCards from'../pages/GiftCards'
import ThanksgivingBoxs from'../pages/ThanksgivingBoxs'


const RouterPart = () => {
  const routlar=[
    { id:0, path: "/OurPlans", element: <OurPlans/> },
    { id:1, path: "/HowItWorks", element: <HowItWorks/> },
    { id:2, path: "/GiftCards", element: <GiftCards/> },
    { id:3, path: "/ThanksgivingBoxs", element: <ThanksgivingBoxs/> },
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
