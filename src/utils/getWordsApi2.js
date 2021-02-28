const getWordsSpeakit2 = async (group) => {
  try {
    let requests = new Array(30)
      .fill("")
      .map((page,i) =>
        fetch(
          `https://afternoon-falls-25894.herokuapp.com/words?group=${group}&page=${i}`
        )
      );
    console.log(requests);
    let promise = await Promise.all(requests)
      .then((responses) => {
        for (let response of responses) {
          if (!response.ok) {
            throw new Error(`${response.url} : status = ${response.status}`);
          }
        }
        return responses;
      })
      .then((responses) => Promise.all(responses.map((data) => data.json())))
      .then((words) => words);

    let result = await promise;

    return result;
  } catch (error) {
    throw new Error(`Error in API - ${error.message}`);
  }
};

export default getWordsSpeakit2;
