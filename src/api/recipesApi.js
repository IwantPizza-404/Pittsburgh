const BASE_URL = 'https://dummyjson.com'

export const recipesApi = {
  // Get recipes
  getRecipes: async ({ limit, skip, sortBy, order, searchQuery, tag }) => {
    let url = `${BASE_URL}/recipes?limit=${limit}&skip=${skip}`
    
    // Sorting
    if (sortBy && order) {
      url += `&sortBy=${sortBy}&order=${order}`
    }

    // Search
    if (searchQuery) {
      url = `${BASE_URL}/recipes/search?q=${searchQuery}&limit=${limit}&skip=${skip}`
    }
    
    // Tag
    if (tag) {
      url = `${BASE_URL}/recipes/tag/${tag}?limit=${limit}&skip=${skip}`
    }
    
    const response = await fetch(url)
    return response.json()
  },
  
  // Get tags
  getTags: async () => {
    const response = await fetch(`${BASE_URL}/recipes/tags`)
    return response.json()
  }
} 