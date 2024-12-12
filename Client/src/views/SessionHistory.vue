<template>
    <div class="main" style="min-height: 100vh;">
      <BRow>
        <BCol class="quotes text-center">
          <p style="color: whitesmoke; font-size: 34px; text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);">Session History</p>
          <BCard class="card">
            <div class="stats">
              <p style="font-size: 18px;">Previous Sessions:</p>
              <ul class="history-list">
                <li v-for="(session, index) in sessionHistory" :key="index">
                  <p>Session {{ index + 1 }}: {{ session.entries }} entries</p>
                </li>
              </ul>
            </div>
          </BCard>
        </BCol>
      </BRow>
    </div>
  </template>