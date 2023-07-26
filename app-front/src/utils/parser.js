export const parseKpi = (type, data) => {
    let kpi;

    if(!data) return 0

    if (type === "newVisitor") {
        kpi = data.users.length
    } else {
        kpi = data.events.filter((events) => events.kind === type).length
    }

    return kpi
}

export const parseGraph = (type, data) => {
    const result = data.events.map(event => {
        console.log(formatDate(new Date(event.time)))
        return [
            toString(event.time),
            1
        ]
    })
    console.log(result)
    return result
}

const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Les mois vont de 0 à 11
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day}/${month}/${year} - ${hours}:${minutes}`;
}
