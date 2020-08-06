export default function convertHourToMinutes(time: string) {

    //Split para separar horas de minutos (utilizando o : como referencia) e convertendo para numero
    const [hour, minutes] = time.split(':').map(Number);

    //convertendo as horas em minutos e somando tudo em minutos
    const timeInMinutes = (hour * 60) + minutes;

    return timeInMinutes;
}