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

export const parseGraph = (type, data, timeStep) => {
    const events = data.events.filter(event => event.kind === type)

    events.sort((a, b) => a.time - b.time)
    const timeGap = events[events.length - 1].time - events[0].time

    const steps = Math.round(timeGap / parseInt(timeStep))
    const graphData = []

    for(let i = 0; i <= steps; i++){
        graphData.push([
            events[0].time + i * timeStep,
            0
        ])
    }

    events.forEach(event => {
        const timeAfterMin = event.time - events[0].time
        const graphDataRank = Math.round(timeAfterMin / timeStep)

        if(graphDataRank > timeStep) graphDataRank = timeStep
        
        graphData[graphDataRank][1] += 1
    })

    graphData.map(data => data[0] = formatDate(new Date(data[0])))
    graphData.unshift(["Date", type])

    return graphData
}

const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day}/${month}/${year} - ${hours}:${minutes}`;
}
