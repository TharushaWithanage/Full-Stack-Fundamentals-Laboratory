/* View Details Modal (Courses page) */
document.addEventListener("DOMContentLoaded", function () {
    const detailButtons = document.querySelectorAll(".view-details-btn");

    // Do nothing on pages without View Details buttons
    if (detailButtons.length === 0) return;

    const modalHTML = `
        <div class="modal fade" id="courseModal" tabindex="-1"
             aria-labelledby="courseModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="courseModalLabel"></h5>
                        <button type="button" class="btn-close"
                                data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body" id="courseModalBody"></div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary"
                                data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>`;

    document.body.insertAdjacentHTML("beforeend", modalHTML);

    const modalElement = document.getElementById("courseModal");
    const modalTitle = document.getElementById("courseModalLabel");
    const modalBody = document.getElementById("courseModalBody");
    const courseModal = new bootstrap.Modal(modalElement);

    detailButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            modalTitle.textContent = button.dataset.title;
            modalBody.textContent = button.dataset.description;
            courseModal.show();
        });
    });
});