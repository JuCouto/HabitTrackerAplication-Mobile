
import {TouchableOpacity, Dimensions } from "react-native"

const WEEK_DAYS =7; // Mostra que vou ter 7 quadrados por linha.
const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5; // calcula o espaçamento que tenho nas laterais da tela.

export const DAY_MARGIN_BETWEEN = 8; // esse parâmetro será usado como espaçamento entre os quadrados.
export const DAY_SIZE = (Dimensions.get('screen').width / WEEK_DAYS) - (SCREEN_HORIZONTAL_PADDING + 5); // dimensions pega o tamanho da tela do dispositivo.
                                                                                                      // vou dividir a largura da tela pelos dias da semana
export function HabitDay(){
    return(
        <TouchableOpacity 
        className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-700 "
        style={{width: DAY_SIZE, height: DAY_SIZE}}
        activeOpacity={0.6}
        />

       
    )
}