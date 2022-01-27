const countries = [
    {
      country: 'US',
      languages: ['en']
    },
    {
      country: 'BE',
      languages: ['nl', 'de']
    },
    {
      country: 'NL',
      languages: ['fr', 'nl']
    },
    {
      country: 'DE',
      languages: ['de']
    },
    {
      country: 'ES',
      languages: ['es']
    },
    {
      country: 'PT',
      languages: ['pt']
    }
  ]

const mostCommonElements = (arr, size) => {
  const commonElements = new Set()
  arr.sort();
  
  for (let index = 1; index < size; index++) {
      if (arr[index] == arr[index - 1]) {
        commonElements.add(arr[index])
      } 
  }
  return commonElements
}

const findCountryWithMostOfficialLanguages = (countries) => {
  const languages = countries.map(country => country.languages).join().split(',')
  const commonElements = mostCommonElements(languages, languages.length)

  for (let country of countries) {
    for (let element of commonElements) {
      if(country.languages.includes(element)) {
        console.log(country);
      }
    }
  }
}