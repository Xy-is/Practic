package com.example.pract.api.controller;

import com.example.pract.api.dto.DepartmentDto;
import com.example.pract.api.model.Department;
import com.example.pract.api.service.DepartmentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/department")
public class DepartmentController {
    private final DepartmentService departmentService;

    public DepartmentController(DepartmentService departmentService) {
        this.departmentService = departmentService;
    }

    @GetMapping()
    public ResponseEntity<List<DepartmentDto>> getAllDepartmentById() {
        List<DepartmentDto> department = departmentService.findAllDepartment();
        if (department != null) {
            return ResponseEntity.ok(department);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<DepartmentDto> getDepartmentById(@PathVariable Long id) {
        DepartmentDto department = departmentService.findById(id);
        if (department != null) {
            return ResponseEntity.ok(department);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PostMapping
    public ResponseEntity<Department> createDepartment(@RequestBody Department department) {
        Department createdDepartment = departmentService.save(department);
        if (createdDepartment != null) {
            return ResponseEntity.status(HttpStatus.CREATED).body(createdDepartment);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Department> updateDepartment(@PathVariable Long id, @RequestBody Department department) {
        Department updatedDepartment = departmentService.update(id, department);
        if (updatedDepartment != null) {
            return ResponseEntity.ok(updatedDepartment);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDepartment(@PathVariable Long id) {
        if (departmentService.delete(id)) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
