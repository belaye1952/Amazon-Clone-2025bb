import { Type } from "./action.type"

export const initialState = { basket: [] }
export const reducer = (state, action) => {
  switch (action.type) {
    case Type.ADD_TO_BASKET:
      // is current item from user exist in basket? 10
      const isexist = state.basket.find((item) => item.id === action.item.id)
      if (!isexist) {
        return {
          ...state,
          basket: [...state.basket, { ...action.item, amount: 1 }],
        }
      } else {
        const updatedItems = state.basket.map((item) => {
          return item.id === action.item.id
            ? { ...item, amount: item.amount + 1 }
            : item
        })
        return {
          ...state,
          basket: updatedItems,
        }
      }

    case Type.REMOVE_FROM_BASKET:
      const index = state.basket.findIndex((item) => item.id === action.id)

      let newBasket = [...state.basket]
      if (index >= 0) {
        if (newBasket[index].amount > 1) {
          newBasket[index] = {
            ...newBasket[index],
            amount: newBasket[index].amount - 1,
          }
        } else {
          
          newBasket.splice(index, 1)
        }
      }
      return {
        ...state,
        basket: newBasket,
      }

    default:
      return state
  }
}