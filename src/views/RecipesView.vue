<script setup>
import { ref, onMounted } from 'vue'
import { DropdownIcon, ListIcon, SearchIcon, SortIcon, ArrowLeftIcon, ArrowRightIcon } from '@/components/icons'
import { useRecipes } from '@/composables/useRecipes'

const showTagsDropdown = ref(false)

const {
  recipes,
  loading,
  error,
  currentPage,
  totalPages,
  selectedTags,
  availableTags,
  searchQuery,
  fetchRecipes,
  fetchTags,
  toggleTag,
  handleSearch,
  handleSort,
  mapDifficulty,
  changePage
} = useRecipes()

const handleToggleTag = (tag) => {
  toggleTag(tag)
  showTagsDropdown.value = false
}

// Initialize
onMounted(() => {
  fetchTags()
  fetchRecipes()
})
</script>

<template>
  <div class="recipes-page">
    <div class="container">
      <div class="recipes-filters">
        <div class="tags-filter">
          <div class="dropdown">
            <button class="dropdown-toggle" @click="showTagsDropdown = !showTagsDropdown">
              <div class="list-icon">
                <ListIcon/>
              </div>
              <span>{{ selectedTags.length ? selectedTags[0] : 'Теги' }}</span>
              <span class="dropdown-icon">
                <DropdownIcon/>
              </span>
            </button>
            <div class="dropdown-menu" v-if="showTagsDropdown">
              <div 
                v-for="tag in availableTags" 
                :key="tag" 
                class="dropdown-item"
                :class="{ active: selectedTags.includes(tag) }"
                @click="handleToggleTag(tag)"
              >
                {{ tag }}
              </div>
            </div>
          </div>
        </div>
        <div class="search-filter">
          <input 
            type="text" 
            placeholder="Найти рецепт" 
            v-model="searchQuery" 
            @keyup.enter="handleSearch"
          />
          <span class="search-icon" @click="handleSearch">
            <SearchIcon/>
          </span>
        </div>
      </div>
  
      <div class="recipes-table">
        <div v-if="loading" class="loading">Loading...</div>
        <div v-else-if="error" class="error">{{ error }}</div>
        <table v-else>
          <thead>
            <tr>
              <th @click="handleSort('name')">
                <span>
                  Название 
                </span>
                <span class="sort-icon">
                  <SortIcon/>
                </span>
              </th>
              <th>Кухня</th>
              <th>Сложность</th>
              <th>Калории на порцию</th>
              <th>Время готовки</th>
              <th>Теги</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="recipe in recipes" :key="recipe.id">
              <td>
                {{ recipe.name }}
              </td>
              <td>{{ recipe.cuisine }}</td>
              <td>
                <span 
                  class="difficulty-badge" 
                  :class="{
                    'easy': mapDifficulty(recipe.difficulty) === 'Легко',
                    'medium': mapDifficulty(recipe.difficulty) === 'Средняя',
                    'hard': mapDifficulty(recipe.difficulty) === 'Сложно'
                  }"
                >
                  {{ mapDifficulty(recipe.difficulty) }}
                </span>
              </td>
              <td>{{ recipe.caloriesPerServing }} кал.</td>
              <td>{{ recipe.cookTimeMinutes }} минут</td>
              <td>
                <div class="tag-list">
                  <span 
                    class="tag" 
                    v-for="(tag, index) in recipe.tags" 
                    :key="index"
                    @click="handleToggleTag(tag)"
                  >
                    {{ tag }}
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="pagination" v-if="!loading && !error && totalPages > 0">
        <button class="pagination-arrow" :disabled="currentPage === 1" @click="changePage(currentPage - 1)">
          <span>
            <ArrowLeftIcon/>
          </span>
        </button>
        <div class="pagination-numbers">
          <button 
            v-for="page in Math.min(5, totalPages)" 
            :key="page" 
            :class="{ active: page === currentPage }"
            @click="changePage(page)"
          >
            {{ page }}
          </button>
          <span v-if="totalPages > 5">...</span>
          <button 
            v-if="totalPages > 5" 
            :class="{ active: totalPages === currentPage }"
            @click="changePage(totalPages)"
          >
            {{ totalPages }}
          </button>
        </div>
        <button class="pagination-arrow" :disabled="currentPage === totalPages" @click="changePage(currentPage + 1)">
          <span>
            <ArrowRightIcon style="rotate: 180deg;"/>
          </span>
        </button>
      </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 20px;
  max-width: 1204px;
  margin: 0 auto;
}

.recipes-filters {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.dropdown {
  position: relative;
}

.dropdown-toggle {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 230px;
  height: 44px;
  padding: 10px 10px 10px 14px;
  background-color: var(--bg-primary-color);
  border: 1px solid var(--gray-300);
  border-radius: 10px;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 5%);
  cursor: pointer;
}
.dropdown-toggle span {
  font-size: 16px;
  font-weight: 500;
  color: var(--graphite-400);
}

.dropdown-icon {
  display: flex;
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
}
.list-icon {
  display: flex;
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  z-index: 10;
  background-color: white;
  border: 1px solid var(--gray-300);
  border-radius: 10px;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 5%);
  max-height: 300px;
  overflow-y: auto;
  min-width: 100%;
}

.dropdown-item {
  padding: 10px 14px;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: var(--bg-secondary-color);
}

.dropdown-item.active {
  background-color: var(--primary-color);
  color: white;
}

.search-filter {
  position: relative;
}

.search-filter input {
  padding: 10px 14px 10px 39px;
  border: 1px solid var(--gray-300);
  border-radius: 10px;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  height: 44px;
  width: 314px;
}
.search-filter input::placeholder {
  color: var(--graphite-300);
}

.search-icon {
  position: absolute;
  display: flex;
  left: 9px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}

.recipes-table {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: var(--bg-primary-color);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  overflow: hidden;
  min-height: 628px;
}

.loading, .error {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  width: 100%;
}

.error {
  color: #f44336;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  line-height: 20px;
  text-align: left;
  padding: 14px 16px;
  font-size: 14px;
  font-weight: 500;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
  overflow: hidden;
  height: fit-content;
  color: var(--graphite-400);
  border-bottom: 1px solid var(--border-color);
  cursor: pointer;
  user-select: none;
}

td {
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: var(--graphite-900);
  padding: 14px 16px;
  border-bottom: 1px solid var(--border-color);
}

tr:hover {
  background-color: var(--bg-secondary-color);
}

.sort-icon {
  position: absolute;
  display: inline;
  margin-left: 8px;
  color: var(--graphite-300);
}

.sort-icon.active {
  opacity: 1;
}

.difficulty-badge {
  display: inline-block;
  padding: 0px 8px;
  height: 22px;
  border-radius: 100px;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
}

.difficulty-badge.easy {
  background-color: #C7FDC7;
  border: 1px solid #90FB90;
  color: #44D54D;
}

.difficulty-badge.medium {
  background-color: #FEECCF;
  border: 1px solid #FCE3B7;
  color: #FFB700;
}

.difficulty-badge.hard {
  background-color: #FED3D3;
  border: 1px solid #FCCDBB;
  color: #F24848;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  display: flex;
  align-items: center;
  background-color: #E7EAEE;
  border: 1px solid #DEE2E6;
  padding: 0 8px;
  height: 22px;
  border-radius: 100px;
  font-size: 10px;
  font-weight: 500;
  line-height: 18px;
  color: #5A5C5F;
  cursor: pointer;
}

.tag:hover {
  opacity: 0.8;
}

.pagination {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 20px;
  margin: 8px 0;
}

.pagination-arrow {
  width: 32px;
  height: 32px;
  color: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  cursor: pointer;
}

.pagination-arrow:disabled {
  color: var(--graphite-400);
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-numbers {
  display: flex;
  margin: 0 4px;
}

.pagination-numbers button {
  width: 32px;
  height: 32px;
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 8px;
  margin: 0 4px;
  cursor: pointer;
}

.pagination-numbers button.active {
  background-color: var(--primary-color);
  color: white;
}
</style> 