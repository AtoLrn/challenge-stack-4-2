export const parseHeatmap = (data) => {
    const clickArray = data.events.filter(event => event.kind === "click")
    const movementArray = data.events.filter(event => event.kind === "mouse-movement")

    const clickData = []
    for(let i = 0; i < clickArray.length; i++) {
        const indexIfExisting = clickData.findIndex(data => data.x === clickArray[i].x && data.y === clickArray[i].y)

        if (indexIfExisting >= 0) {
            clickData[indexIfExisting].value += 1
        } else {
            clickData.push({
                x: clickArray[i].x,
                y: clickArray[i].y,
                value: 1
            })
        }
    }

    const movementData = []
    for(let i = 0; i < movementArray.length; i++) {
        const indexIfExisting = movementData.findIndex(data => data.x === movementArray[i].x && data.y === movementArray[i].y)

        if (indexIfExisting >= 0) {
            movementData[indexIfExisting].value += 1
        } else {
            movementData.push({
                x: movementArray[i].x,
                y: movementArray[i].y,
                value: 1
            })
        }
    }

    return {
        click: clickData,
        movement: movementData
    }
}

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
    if(!data || !data.events.length) return [["Data", type], [0,0]]
    
    const events = data.events.filter(event => event.kind === type)
    
    if(!events.length) return [["Data", type], [0,0]]

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
