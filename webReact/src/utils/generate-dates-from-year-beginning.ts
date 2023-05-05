import dayjs from "dayjs";

export function generateDatesFromYearBeginning() {
    const firstDayOfTheYear = dayjs().startOf('year');
    const today = new Date();

    const dates = []
    let compareDate = firstDayOfTheYear

    while(compareDate.isBefore(today)) {
        dates.push(compareDate.toDate()) // converte para uma data do javascript (se não tiver essa conversão ele envia um objeto dayjs)
        compareDate = compareDate.add(1, 'day') // adiciona 1 dia ao compareDate
    }
    return dates;
}