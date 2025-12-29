<script setup>
import { ref, onMounted } from "vue";
import api from "@/services/api";
import { logout } from "@/services/auth";
import { useRouter } from "vue-router";
import draggable from "vuedraggable"; 

const router = useRouter();

/* STATE */
const todoList = ref([]);
const progressList = ref([]);
const doneList = ref([]);
const title = ref("");
const status = ref("todo");

/* LOGOUT */
const handleLogout = () => {
  logout();
  router.push("/");
};

/* FETCH TASKS */
const fetchTasks = async () => {
  try {
    const res = await api.get("/tasks/");
    const allTasks = res.data;
    
    todoList.value = allTasks.filter(t => t.status === 'todo');
    progressList.value = allTasks.filter(t => t.status === 'in_progress');
    doneList.value = allTasks.filter(t => t.status === 'done');
  } catch (error) {
    console.error("Tasklar çekilemedi", error);
  }
};

/* ADD TASK */
const addTask = async () => {
  if (!title.value.trim()) return;

  try {
    await api.post("/tasks/", {
      title: title.value,
      status: status.value,
    });
    title.value = "";
    fetchTasks(); 
  } catch (error) {
    console.error("Ekleme hatası", error);
  }
};

/* DELETE TASK */
const deleteTask = async (id) => {
  if(!confirm("Bu görevi silmek istediğine emin misin?")) return;
  try {
    await api.delete(`/tasks/${id}/`);
    fetchTasks();
  } catch (error) {
    console.error("Silme hatası", error);
  }
};

/* DRAG & DROP LOGIC */
const onTaskDrop = async (event, newStatus) => {
  if (event.added) {
    const task = event.added.element;
    try {
      await api.patch(`/tasks/${task.id}/`, { status: newStatus });
    } catch (error) {
      console.error("Durum güncellenemedi", error);
    }
  }
};

onMounted(fetchTasks);
</script>

<template>
  <div class="app-container">
    
    <header class="navbar">
      <div class="logo">
        <span class="logo-icon">📋</span>
        <h1>Proje Takip</h1>
      </div>
      <button class="btn-logout" @click="handleLogout">
        Çıkış Yap
      </button>
    </header>

    <main class="board-layout">
      <section class="add-task-bar">
        <div class="input-group">
          <input 
            v-model="title" 
            @keyup.enter="addTask"
            placeholder="Yeni bir görev ekle..." 
            class="task-input"
          />
          <button @click="addTask" class="btn-primary">Ekle</button>
        </div>
      </section>

      <section class="board">
        
        <div class="column">
          <header class="column-header header-todo">
            <h3>Yapılacaklar</h3>
            <span class="count">{{ todoList.length }}</span>
          </header>
          
          <draggable 
            v-model="todoList" 
            group="tasks" 
            item-key="id"
            @change="(e) => onTaskDrop(e, 'todo')"
            class="drag-area"
          >
            <template #item="{ element }">
              <div class="task-card">
                <span class="task-title">{{ element.title }}</span>
                <button class="btn-delete" @click="deleteTask(element.id)">🗑️</button>
              </div>
            </template>
          </draggable>
        </div>

        <div class="column">
          <header class="column-header header-progress">
            <h3>Sürüyor</h3>
            <span class="count">{{ progressList.length }}</span>
          </header>
          
          <draggable 
            v-model="progressList" 
            group="tasks" 
            item-key="id"
            @change="(e) => onTaskDrop(e, 'in_progress')"
            class="drag-area"
          >
            <template #item="{ element }">
              <div class="task-card">
                <span class="task-title">{{ element.title }}</span>
                <button class="btn-delete" @click="deleteTask(element.id)">🗑️</button>
              </div>
            </template>
          </draggable>
        </div>

        <div class="column">
          <header class="column-header header-done">
            <h3>Tamamlandı</h3>
            <span class="count">{{ doneList.length }}</span>
          </header>
          
          <draggable 
            v-model="doneList" 
            group="tasks" 
            item-key="id"
            @change="(e) => onTaskDrop(e, 'done')"
            class="drag-area"
          >
            <template #item="{ element }">
              <div class="task-card done-card">
                <span class="task-title">{{ element.title }}</span>
                <button class="btn-delete" @click="deleteTask(element.id)">🗑️</button>
              </div>
            </template>
          </draggable>
        </div>

      </section>
    </main>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

/* GLOBAL LAYOUT */
.app-container {
  font-family: 'Inter', sans-serif;
  background-color: #f4f5f7;
  min-height: 100vh;
  color: #172b4d;
}

/* HEADER STYLES (DÜZELTİLDİ) */
.navbar {
  background-color: #ffffff;
  padding: 0.8rem 2rem;
  display: flex;
  justify-content: space-between; /* Sağa ve sola yasla */
  align-items: center;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  margin-bottom: 2rem;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo h1 {
  font-size: 1.2rem;
  font-weight: 700;
  color: #0052cc;
  margin: 0;
}

.btn-logout {
  background: transparent;
  border: 1px solid #dfe1e6;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  color: #de350b;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-logout:hover {
  background-color: #ffebe6;
  border-color: #de350b;
}

/* ADD TASK INPUT STYLES (DÜZELTİLDİ) */
.add-task-bar {
  max-width: 1200px;
  margin: 0 auto 2rem auto;
  padding: 0 1rem;
}

.input-group {
  display: flex;
  gap: 10px;
  background: white;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
}

.task-input {
  flex-grow: 1; /* Input tüm boşluğu kaplasın */
  border: 1px solid #dfe1e6;
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 14px;
  outline: none;
}

.task-input:focus {
  border-color: #0052cc;
}

.btn-primary {
  background-color: #0052cc;
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-primary:hover {
  background-color: #0747a6;
}

/* BOARD & COLUMNS */
.board {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem 2rem 1rem;
  align-items: start;
}

.column {
  background-color: #ebecf0;
  border-radius: 10px;
  padding: 12px;
  display: flex;
  flex-direction: column;
}

.column-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding: 0 4px;
}

.column-header h3 {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
}

.header-todo h3 { color: #42526e; }
.header-progress h3 { color: #0052cc; }
.header-done h3 { color: #00875a; }

.count {
  background: rgba(9, 30, 66, 0.08);
  color: #172b4d;
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 12px;
  font-weight: 600;
}

/* DRAGGABLE AREA & CARDS */
.drag-area {
  min-height: 150px; /* Boş olsa bile içine sürükleyebilmek için */
  flex-grow: 1;
}

.task-card {
  background: white;
  padding: 12px;
  border-radius: 6px;
  box-shadow: 0 1px 2px rgba(9, 30, 66, 0.13);
  margin-bottom: 8px;
  cursor: grab;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: transform 0.1s, box-shadow 0.2s;
}

.task-card:active {
  cursor: grabbing;
}

/* GHOST & DRAG STYLES */
.sortable-ghost {
  opacity: 0.4;
  background: #deebff;
  border: 1px dashed #0052cc;
}

.sortable-drag {
  opacity: 1;
  background: white;
  transform: rotate(3deg);
  box-shadow: 0 10px 20px rgba(0,0,0,0.2);
}

.done-card .task-title {
  text-decoration: line-through;
  color: #6b778c;
}

.task-title {
  font-size: 14px;
  word-break: break-word;
}

.btn-delete {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  opacity: 0;
  transition: opacity 0.2s;
}

.task-card:hover .btn-delete {
  opacity: 1;
}
</style>