export const parseHeatmap = (data, type, height, width) => {
    const bufferArray = data.events.filter(event => event.kind === type)
    const mainArray = bufferArray.map(event => {
        return {
            y: Math.round(height * event.y / event.window.height),
            x: Math.round(width * event.x / event.window.width)
        }
    })

    const resData = []
    for(let i = 0; i < mainArray.length; i++) {
        const indexIfExisting = resData.findIndex(data => data.x === mainArray[i].x && data.y === mainArray[i].y)

        if (indexIfExisting >= 0) {
            resData[indexIfExisting].value += 1
        } else {
            resData.push({
                x: mainArray[i].x,
                y: mainArray[i].y,
                value: 1
            })
        }
    }
    let max = 0
    resData.forEach(data => {
        max = Math.max(max, data.value)
    })

    return {
        max: max,
        data: resData
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
