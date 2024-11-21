export const fetchTotalPlaintes = async () => {
    const res = await fetch('http://localhost:3003/api/plaintes/total');
    console.log('http://localhost:3003/api/plaintes/total', res);
    return res.json();
  };

  export const fetchTotalStatusPlaintes = async () => {
    const res = await fetch('http://localhost:3003/api/plaintes/repartition_status');
    console.log('http://localhost:3003/api/plaintes/repartition_status', res);
    return res.json();
  };
  
  export const fetchRepartitionParRegion = async () => {
    const res = await fetch('http://localhost:3003/api/plaintes/repartition');
    console.log('http://localhost:3003/api/plaintes/repartition', res);
    return res.json();
  };
  
  export const fetchTypesDeViolences = async () => {
    const res = await fetch('http://localhost:3003/api/plaintes/types');
    console.log('http://localhost:3003/api/plaintes/types', res);
    return res.json();
  };
  
  export const fetchStatsParJour = async () => {
    const res = await fetch('http://localhost:3003/api/plaintes/par-jour');
    console.log('http://localhost:3003/api/plaintes/par-jour', res);
    return res.json();
  };
  
  export const fetchTempsMoyen = async () => {
    const res = await fetch('http://localhost:3003/api/plaintes/temps-moyen');
    console.log('http://localhost:3003/api/plaintes/temps-moyen', res);
    return res.json();
  };