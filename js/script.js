$(document).ready(function () {
    const taskList = $("#taskList");

    // Add Task
    $("#addTaskButton").click(function () {
        const taskName = $("#taskInput").val().trim();
        if (taskName === "") {
            alert("Task cannot be empty!");
            return;
        }

        const task = $(`
            <li>
                <span>${taskName}</span>
                <div class="action-buttons">
                    <button class="edit-btn">Edit</button>
                    <button class="complete-task">Mark Complete</button>
                    <button class="delete-task">Delete</button>
                </div>
            </li>
        `).hide();

        taskList.append(task.fadeIn());
        $("#taskInput").val("");
    });

    // Mark Task as Complete
    taskList.on("click", ".complete-task", function () {
        const taskItem = $(this).closest("li");
        const taskSpan = taskItem.find("span");

        taskSpan.toggleClass("completed");
        taskItem.toggleClass("completedBg");

        const buttonText = taskSpan.hasClass("completed") ? "Mark Uncompleted" : "Mark Complete";
        $(this).text(buttonText);
    });

    // Delete Task
    taskList.on("click", ".delete-task", function () {
        $(this).closest("li").fadeOut(function () {
            $(this).remove();
        });
    });

 // Edit Task
taskList.on('click', '.edit-btn', function () {
    const taskItem = $(this).closest('li'); 
    const taskNameSpan = taskItem.find('span'); 
    const newTaskName = prompt('Edit Task', taskNameSpan.text()); 
    if (newTaskName) {
        taskNameSpan.text(newTaskName);
    }
});

    // Filter Tasks
    $("#taskFilter").change(function () {
        const filter = $(this).val();
        $("li").each(function () {
            const isCompleted = $(this).hasClass("completed");
            if (
                (filter === "completed" && !isCompleted) ||
                (filter === "pending" && isCompleted)
            ) {
                $(this).hide();
            } else {
                $(this).show();
            }
        });
    });
});
