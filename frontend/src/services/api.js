const API_BASE_URL = 'http://localhost:8080/api';

// Helper-Funktion für API-Aufrufe
async function apiCall(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
}

// Auth-Services
export const authService = {
  async login(credentials) {
    return apiCall('/auth/signin', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  async register(userData) {
    return apiCall('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  async getCurrentUser() {
    const token = localStorage.getItem('token');
    if (!token) return null;
    
    return apiCall('/auth/me', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },
};

// Recipe-Services
export const recipeService = {
  async getAllRecipes() {
    return apiCall('/recipes');
  },

  async getRecipeById(id) {
    return apiCall(`/recipes/${id}`);
  },

  async createRecipe(recipeData) {
    const token = localStorage.getItem('token');
    return apiCall('/recipes', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(recipeData),
    });
  },

  async updateRecipe(id, recipeData) {
    const token = localStorage.getItem('token');
    return apiCall(`/recipes/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(recipeData),
    });
  },

  async deleteRecipe(id) {
    const token = localStorage.getItem('token');
    return apiCall(`/recipes/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },

  async getRecipesByCategory(category) {
    return apiCall(`/recipes/category/${category}`);
  },

  async searchRecipes(query) {
    return apiCall(`/recipes/search?q=${encodeURIComponent(query)}`);
  },
};

// Rating-Services
export const ratingService = {
  async getRatingsForRecipe(recipeId) {
    return apiCall(`/ratings/recipe/${recipeId}`);
  },

  async addRating(recipeId, ratingData) {
    const token = localStorage.getItem('token');
    return apiCall(`/ratings/recipe/${recipeId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(ratingData),
    });
  },

  async updateRating(ratingId, ratingData) {
    const token = localStorage.getItem('token');
    return apiCall(`/ratings/${ratingId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(ratingData),
    });
  },

  async deleteRating(ratingId) {
    const token = localStorage.getItem('token');
    return apiCall(`/ratings/${ratingId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },
};

// Favorite-Services
export const favoriteService = {
  async getUserFavorites() {
    const token = localStorage.getItem('token');
    return apiCall('/favorites', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },

  async addToFavorites(recipeId) {
    const token = localStorage.getItem('token');
    return apiCall('/favorites', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ recipeId }),
    });
  },

  async removeFromFavorites(recipeId) {
    const token = localStorage.getItem('token');
    return apiCall(`/favorites/${recipeId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },

  async isFavorite(recipeId) {
    const token = localStorage.getItem('token');
    try {
      await apiCall(`/favorites/${recipeId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return true;
    } catch {
      return false;
    }
  },
};

// User-Services
export const userService = {
  async getUserProfile() {
    const token = localStorage.getItem('token');
    return apiCall('/users/profile', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },

  async updateUserProfile(userData) {
    const token = localStorage.getItem('token');
    return apiCall('/users/profile', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });
  },

  async getUserRecipes() {
    const token = localStorage.getItem('token');
    return apiCall('/users/recipes', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  },
};

export default {
  auth: authService,
  recipes: recipeService,
  ratings: ratingService,
  favorites: favoriteService,
  users: userService,
}; 