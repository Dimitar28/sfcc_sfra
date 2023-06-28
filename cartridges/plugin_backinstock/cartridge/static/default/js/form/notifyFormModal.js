const notifyFormModal = document.querySelector(".notificationModal")
const notifyFormModalOpenButton = document.querySelector(".notify-me-btn");
const notifyModalCloseButton = document.querySelector(".closeModalBtn");
notifyFormModalOpenButton.addEventListener("click", () => {
    notifyFormModal.showModal();
})
notifyModalCloseButton.addEventListener("click", () => {
    notifyFormModal.close();
})