import React from 'react'
import lemon from '../../images/lemon.png'
import apple from '../../images/apple.png'
import orang from '../../images/orang.png'
import css from './fruits.module.css'







export const Lemon = () => {

    return (

        <img className={css.Fruit} src={lemon} alt='lemon' />
    )
}

export const Apple = () => {

    return (
        <img src={apple} alt='apple' />
    )

}
export const Orang = () => {
    return (
        <img src={orang} alt='orang' />
    )

}




