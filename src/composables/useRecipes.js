import { ref, computed } from 'vue'
import { recipesApi } from '@/api/recipesApi'
import { mapDifficulty } from '@/utils/recipeUtils'

export function useRecipes() {
  const recipes = ref([])
  const loading = ref(true)
  const error = ref(null)

  const currentPage = ref(1)
  const itemsPerPage = ref(11)
  const totalRecipes = ref(0)
  const totalPages = computed(() => Math.ceil(totalRecipes.value / itemsPerPage.value))

  const selectedTags = ref([])
  const availableTags = ref([])

  const sortBy = ref('name')
  const sortOrder = ref('asc')

  const searchQuery = ref('')

  // Fetch recipes
  const fetchRecipes = async () => {
    loading.value = true
    error.value = null
    
    try {
      const data = await recipesApi.getRecipes({
        limit: itemsPerPage.value,
        skip: (currentPage.value - 1) * itemsPerPage.value,
        sortBy: sortBy.value,
        order: sortOrder.value,
        searchQuery: searchQuery.value,
        tag: selectedTags.value.length > 0 ? selectedTags.value[0] : null
      })
      
      recipes.value = data.recipes
      totalRecipes.value = data.total
    } catch (err) {
      error.value = 'Failed to load recipes'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  // Fetch tags
  const fetchTags = async () => {
    try {
      availableTags.value = await recipesApi.getTags()
    } catch (err) {
      console.error('Failed to load tags:', err)
    }
  }

  // Tag selection
  const toggleTag = (tag) => {
    const index = selectedTags.value.indexOf(tag)
    if (index === -1) {
      selectedTags.value = [tag]
    } else {
      selectedTags.value = []
    }
    currentPage.value = 1
    fetchRecipes()
  }

  // Search
  const handleSearch = () => {
    currentPage.value = 1
    fetchRecipes()
  }

  // Sorting
  const handleSort = (column) => {
    if (sortBy.value === column) {
      sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
    } else {
      sortBy.value = column
      sortOrder.value = 'asc'
    }
    fetchRecipes()
  }

  // Change page
  const changePage = (page) => {
    currentPage.value = page
    fetchRecipes()
  }

  return {
    recipes,
    loading,
    error,
    currentPage,
    itemsPerPage,
    totalRecipes,
    totalPages,
    selectedTags,
    availableTags,
    sortBy,
    sortOrder,
    searchQuery,
    fetchRecipes,
    fetchTags,
    toggleTag,
    handleSearch,
    handleSort,
    mapDifficulty,
    changePage
  }
} 