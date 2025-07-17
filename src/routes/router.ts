import { Router } from "express";
import { init, reset } from "../handlers/users";

const router = Router();

// /api/users
router.get('/', init)
// router.get('/', test)

router.get('/reset', reset)

// /api/users/id
// router.get('/:id', getUserById)

// // /api/users
// router.post('/', createUser)


export default router;