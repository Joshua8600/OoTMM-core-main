#include <combo.h>
#include "Obj_Kibako.h"

#define FLAGS (ACTOR_FLAG_MM_10 | ACTOR_FLAG_MM_CAN_PRESS_SWITCH)

#if defined(GAME_MM)
# define SEGADDR_KEEP_CRATE_DL       ((void*)0x05007890)
# define SEGADDR_KEEP_FRAGMENT_DL    ((void*)0x05007980)
# define SEGADDR_OBJ_CRATE_DL        ((void*)0x06001180)
# define SEGADDR_OBJ_FRAGMENT_DL     ((void*)0x06001a70)
#endif

void ObjKibako_Init(Actor_ObjKibako* this, GameState_Play* play);
void ObjKibako_Destroy(Actor_ObjKibako* this, GameState_Play* play);
void ObjKibako_Update(Actor_ObjKibako* this, GameState_Play* play);

void ObjKibako_Draw(Actor_ObjKibako* this, GameState_Play* play);
void ObjKibako_SpawnCollectible(Actor_ObjKibako* this, GameState_Play* play);
void func_809262BC(Actor_ObjKibako* this);
void func_80926318(Actor_ObjKibako* this, GameState_Play* play);
void ObjKibako_AirBreak(Actor_ObjKibako* this, GameState_Play* play);
void ObjKibako_WaterBreak(Actor_ObjKibako* this, GameState_Play* play);
void func_80926B40(Actor_ObjKibako* this);
void func_80926B54(Actor_ObjKibako* this, GameState_Play* play);
void ObjKibako_SetupIdle(Actor_ObjKibako* this);
void ObjKibako_Idle(Actor_ObjKibako* this, GameState_Play* play);
void ObjKibako_SetupHeld(Actor_ObjKibako* this);
void ObjKibako_Held(Actor_ObjKibako* this, GameState_Play* play);
void ObjKibako_SetupThrown(Actor_ObjKibako* this);
void ObjKibako_Thrown(Actor_ObjKibako* this, GameState_Play* play);

static s16 D_80927384 = 0;
static s16 D_80927388 = 0;
static s16 D_8092738C = 0;

static ColliderCylinderInit sCylinderInit = {
    {
        COLTYPE_NONE,
        AT_ON | AT_TYPE_PLAYER,
        AC_ON | AC_TYPE_PLAYER,
        OC1_ON | OC1_TYPE_ALL,
        OC2_TYPE_2,
        COLSHAPE_CYLINDER,
    },
    {
        ELEMTYPE_UNK0,
        { 0x00400000, 0x00, 0x02 },
        { 0x058BC79C, 0x00, 0x00 },
        TOUCH_ON | TOUCH_SFX_NONE,
        BUMP_ON,
        OCELEM_ON,
    },
    { 15, 30, 0, { 0, 0, 0 } },
};

static s16 sObjectIds[] = { OBJECT_GAMEPLAY_DANGEON_KEEP, OBJECT_KIBAKO };

static Gfx* sKakeraDisplayLists[] = { SEGADDR_KEEP_FRAGMENT_DL, SEGADDR_OBJ_FRAGMENT_DL };

static Gfx* sDisplayLists[] = { SEGADDR_KEEP_CRATE_DL, SEGADDR_OBJ_CRATE_DL };

static InitChainEntry sInitChain[] = {
    ICHAIN_F32_DIV1000(gravity, -1500, ICHAIN_CONTINUE),
    ICHAIN_F32_DIV1000(minVelocityY, -18000, ICHAIN_CONTINUE),
    ICHAIN_F32(uncullZoneScale, 60, ICHAIN_CONTINUE),
    ICHAIN_F32(uncullZoneDownward, 60, ICHAIN_STOP),
};

void ObjKibako_SpawnCollectible(Actor_ObjKibako* this, GameState_Play* play) {
    s32 dropItem00Id;

    if (this->isDropCollected == 0) {
        dropItem00Id = Item_CollectibleDropTable(KIBAKO_COLLECTIBLE_ID(this));
        if (dropItem00Id > ITEM00_NO_DROP) {
            Item_DropCollectible(play, &this->actor.world.pos,
                                 dropItem00Id | KIBAKO_COLLECTIBLE_FLAG(this) << 8);
            this->isDropCollected = 1;
        }
    }
}

void ObjKibako_SetShadow(Actor_ObjKibako* this) {
    if ((this->actor.projectedPos.z < 370.0f) && (this->actor.projectedPos.z > -10.0f)) {
        this->actor.shape.shadowDraw = ActorShadow_DrawSquare;
        this->actor.shape.shadowScale = 1.4f;
        this->actor.shape.shadowAlpha =
            (this->actor.projectedPos.z < 200.0f) ? 100 : (400 - ((s32)this->actor.projectedPos.z)) >> 1;
    } else {
        this->actor.shape.shadowDraw = NULL;
    }
}

void func_809262BC(Actor_ObjKibako* this) {
    s16 angle = this->actor.world.rot.y;

    if ((angle & 0x3FFF) != 0) {
        angle = Math_ScaledStepToS(&this->actor.world.rot.y, (s16)(angle + 0x2000) & 0xC000, 0x640);
        this->actor.shape.rot.y = this->actor.world.rot.y;
    }
}

void func_80926318(Actor_ObjKibako* this, GameState_Play* play) {
    s16 angle;

    if (this->actor.xzDistToPlayer < 100.0f) {
        angle = this->actor.yawTowardsPlayer - GET_PLAYER(play)->actor.world.rot.y;
        if (ABS_ALT(angle) > 0x5555) {
            Actor_OfferGetItem(&this->actor, play, GI_NONE, 36.0f, 30.0f);
        }
    }
}

void func_80926394(Actor_ObjKibako* this, GameState_Play* play) {
    if ((this->isDropCollected == 0) && (play->roomCtx.curRoom.num != this->unk199)) {
        this->isDropCollected = 1;
    }
}

void ObjKibako_Init(Actor_ObjKibako* this, GameState_Play* play)
{
    s32 objectIndex;

    objectIndex = KIBAKO_BANK_INDEX(this);
    Actor_ProcessInitChain(&this->actor, sInitChain);
    Actor_SetScale(&this->actor, 0.15f);
    if (objectIndex == 0) {
        this->actor.uncullZoneForward = 4000.0f;
    } else {
        this->actor.uncullZoneForward = 800.0f;
    }
    Collider_InitCylinder(play, &this->collider);
    Collider_SetCylinder(play, &this->collider, &this->actor, &sCylinderInit);
    Collider_UpdateCylinder(&this->actor, &this->collider);
    this->actor.colChkInfo.mass = MASS_IMMOVABLE;
    this->objectSlot = Object_GetSlot(&play->objectCtx, sObjectIds[objectIndex]);
    if (this->objectSlot <= -1) {
        Actor_Kill(&this->actor);
        return;
    }
    this->unk199 = this->actor.room;
    func_80926B40(this);
}

void ObjKibako_Destroy(Actor_ObjKibako* this, GameState_Play* play)
{
    Collider_DestroyCylinder(play, &this->collider);
}

void ObjKibako_AirBreak(Actor_ObjKibako* this, GameState_Play* play)
{
    s16 angle;
    s32 i;
    Vec3f* worldPos = &this->actor.world.pos;
    Vec3f pos;
    Vec3f velocity;

    for (i = 0, angle = 0; i < 12; i++, angle += 0x4E20) {
        f32 sn = Math_SinS(angle);
        f32 cs = Math_CosS(angle);
        f32 temp_rand;
        s16 phi_s0;

        pos.x = sn * 16.0f;
        pos.y = (Rand_ZeroOne() * 5.0f) + 2.0f;
        pos.z = cs * 16.0f;
        velocity.x = pos.x * 0.2f;
        velocity.y = (Rand_ZeroOne() * 6.0f) + 2.0f;
        velocity.z = pos.z * 0.2f;
        pos.x += worldPos->x;
        pos.y += worldPos->y;
        pos.z += worldPos->z;
        temp_rand = Rand_ZeroOne();
        if (temp_rand < 0.1f) {
            phi_s0 = 0x60;
        } else if (temp_rand < 0.7f) {
            phi_s0 = 0x40;
        } else {
            phi_s0 = 0x20;
        }

        EffectSsKakera_Spawn(play, &pos, &velocity, worldPos, -200, phi_s0, 20, 0, 0, (Rand_ZeroOne() * 38.0f) + 10.0f,
                             0, 0, 60, -1, sObjectIds[KIBAKO_BANK_INDEX(this)],
                             sKakeraDisplayLists[KIBAKO_BANK_INDEX(this)]);
    }

    SpawnSomeDust(play, worldPos, 40.0f, 3, 0x32, 0x8C, 1);
    SpawnSomeDust(play, worldPos, 40.0f, 2, 0x14, 0x50, 1);
}

void ObjKibako_WaterBreak(Actor_ObjKibako* this, GameState_Play* play) {
    s16 angle;
    s32 i;
    Vec3f* worldPos = &this->actor.world.pos;
    Vec3f pos;
    Vec3f velocity;

    pos.y = worldPos->y + this->actor.depthInWater;
    for (angle = 0, i = 0; i < 5; i++, angle += 0x3333) {
        pos.x = worldPos->x + (Math_SinS(((s32)(Rand_ZeroOne() * 6000.0f)) + angle) * 15.0f);
        pos.z = worldPos->z + (Math_CosS(((s32)(Rand_ZeroOne() * 6000.0f)) + angle) * 15.0f);
        EffectSsGSplash_Spawn(play, &pos, NULL, NULL, 0, 350);
    }
    pos.x = worldPos->x;
    pos.z = worldPos->z;
    EffectSsGRipple_Spawn(play, &pos, 200, 600, 0);

    for (i = 0, angle = 0; i < 12; i++, angle += 0x4E20) {
        f32 sn = Math_SinS(angle);
        f32 cs = Math_CosS(angle);
        f32 temp_rand;
        s16 phi_s0;

        pos.x = sn * 16.0f;
        pos.y = (Rand_ZeroOne() * 5.0f) + 2.0f;
        pos.z = cs * 16.0f;
        velocity.x = pos.x * 0.18f;
        velocity.y = (Rand_ZeroOne() * 4.0f) + 2.0f;
        velocity.z = pos.z * 0.18f;
        pos.x += worldPos->x;
        pos.y += worldPos->y;
        pos.z += worldPos->z;
        temp_rand = Rand_ZeroOne();
        phi_s0 = (temp_rand < 0.2f) ? 0x40 : 0x20;

        EffectSsKakera_Spawn(play, &pos, &velocity, worldPos, -180, phi_s0, 50, 5, 0, (Rand_ZeroOne() * 35.0f) + 10.0f,
                             0, 0, 70, -1, sObjectIds[KIBAKO_BANK_INDEX(this)],
                             sKakeraDisplayLists[KIBAKO_BANK_INDEX(this)]);
    }
}

void func_80926B40(Actor_ObjKibako* this) {
    this->actionFunc = func_80926B54;
}

void func_80926B54(Actor_ObjKibako* this, GameState_Play* play) {
    Actor_MoveWithGravity(&this->actor);
    Actor_UpdateBgCheckInfo(play, &this->actor, 18.0f, 15.0f, 0.0f,
                            UPDBGCHECKINFO_FLAG_WALL | UPDBGCHECKINFO_FLAG_FLOOR | UPDBGCHECKINFO_FLAG_MM_40);
    if (Object_IsLoaded(&play->objectCtx, this->objectSlot)) {
        this->actor.draw = ObjKibako_Draw;
        this->actor.objectSlot = this->objectSlot;
        ObjKibako_SetupIdle(this);
    }
}

void ObjKibako_SetupIdle(Actor_ObjKibako* this)
{
    this->actionFunc = ObjKibako_Idle;
}

void ObjKibako_Idle(Actor_ObjKibako* this, GameState_Play* play)
{
    if (Actor_HasParent(&this->actor, play))
    {
        ObjKibako_SetupHeld(this);
        this->actor.room = -1;
        this->actor.colChkInfo.mass = 120;
        if (Item_CollectibleDropTable2(KIBAKO_COLLECTIBLE_ID(this))) {
            ObjKibako_SpawnCollectible(this, play);
        }

        //! @bug: This function should only pass Player*: it uses *(this + 0x153), which is meant to be
        //! player->currentMask, but in this case is garbage in the collider
        Player_PlaySfx((void*)&this->actor, NA_SE_PL_PULL_UP_WOODBOX);
    } else if ((this->actor.bgCheckFlags & BGCHECKFLAG_WATER) && (this->actor.depthInWater > 19.0f)) {
        ObjKibako_WaterBreak(this, play);
        ObjKibako_SpawnCollectible(this, play);
        SfxSource_PlaySfxAtFixedWorldPos(play, &this->actor.world.pos, 20, NA_SE_EV_WOODBOX_BREAK);
        SfxSource_PlaySfxAtFixedWorldPos(play, &this->actor.world.pos, 40, NA_SE_EV_DIVE_INTO_WATER_L);
        Actor_Kill(&this->actor);
    } else if (this->collider.base.acFlags & AC_HIT) {
        ObjKibako_AirBreak(this, play);
        ObjKibako_SpawnCollectible(this, play);
        SfxSource_PlaySfxAtFixedWorldPos(play, &this->actor.world.pos, 20, NA_SE_EV_WOODBOX_BREAK);
        Actor_Kill(&this->actor);
    } else {
        Actor_MoveWithGravity(&this->actor);
        func_809262BC(this);
        Actor_UpdateBgCheckInfo(play, &this->actor, 18.0f, 15.0f, 0.0f, UPDBGCHECKINFO_FLAG_WALL | UPDBGCHECKINFO_FLAG_FLOOR | UPDBGCHECKINFO_FLAG_MM_40);

        if (!(this->collider.base.ocFlags1 & OC1_TYPE_PLAYER) && (this->actor.xzDistToPlayer > 28.0f)) {
            this->collider.base.ocFlags1 |= OC1_TYPE_PLAYER;
        }

        if ((this->actor.colChkInfo.mass != MASS_IMMOVABLE) && (Math3D_Vec3fDistSq(&this->actor.world.pos, &this->actor.prevPos) < 0.01f))
        {
            this->actor.colChkInfo.mass = MASS_IMMOVABLE;
        }

        this->collider.base.acFlags &= ~AC_HIT;

        if (KIBAKO_BOMBER_CAN_HIDE_IN_BOX(this)) {
            Collider_UpdateCylinder(&this->actor, &this->collider);
            CollisionCheck_SetOC(play, &play->colChkCtx, &this->collider.base);

            if (this->actor.xzDistToPlayer < 800.0f) {
                CollisionCheck_SetAC(play, &play->colChkCtx, &this->collider.base);
                func_80926318(this, play);
            }
        } else {
            if (this->actor.xzDistToPlayer < 800.0f) {
                Collider_UpdateCylinder(&this->actor, &this->collider);
                CollisionCheck_SetAC(play, &play->colChkCtx, &this->collider.base);

                if (this->actor.xzDistToPlayer < 180.0f) {
                    CollisionCheck_SetOC(play, &play->colChkCtx, &this->collider.base);
                    func_80926318(this, play);
                }
            }
        }
    }
}

void ObjKibako_SetupHeld(Actor_ObjKibako* this) {
    this->actionFunc = ObjKibako_Held;
}

void ObjKibako_Held(Actor_ObjKibako* this, GameState_Play* play)
{
    Vec3f pos;
    s32 bgId;

    func_80926394(this, play);
    if (Actor_HasNoParent(&this->actor, play)) {
        this->actor.room = play->roomCtx.curRoom.num;
        if (fabsf(this->actor.speed) < 0.1f) {
            ObjKibako_SetupIdle(this);
            this->collider.base.ocFlags1 &= ~OC1_TYPE_PLAYER;
            Actor_PlaySfx(&this->actor, NA_SE_EV_PUT_DOWN_WOODBOX);
        } else {
            Actor_MoveWithGravity(&this->actor);
            ObjKibako_SetupThrown(this);
            this->actor.flags &= ~ACTOR_FLAG_MM_CAN_PRESS_SWITCH;
        }
        Actor_UpdateBgCheckInfo(play, &this->actor, 18.0f, 15.0f, 0.0f, UPDBGCHECKINFO_FLAG_WALL | UPDBGCHECKINFO_FLAG_FLOOR | UPDBGCHECKINFO_FLAG_MM_40);
    } else {
        pos.x = this->actor.world.pos.x;
        pos.y = this->actor.world.pos.y + 20.0f;
        pos.z = this->actor.world.pos.z;
        this->actor.floorHeight = BgCheck_EntityRaycastDown4(&play->colCtx, &this->actor.floorPoly, &bgId, &this->actor, &pos);
    }
}

void ObjKibako_SetupThrown(Actor_ObjKibako* this) {
    f32 temp;

    temp = (Rand_ZeroOne() - 0.5f) * 1000.0f;
    D_80927388 = temp;
    D_80927384 = (Rand_ZeroOne() - 2.0f) * 1500.0f;
    D_8092738C = temp * 3.0f;
    this->timer = 80;
    this->actionFunc = ObjKibako_Thrown;
}

void ObjKibako_Thrown(Actor_ObjKibako* this, GameState_Play* play)
{
    s32 atHit;

    atHit = (this->collider.base.atFlags & AT_HIT) != 0;
    if (atHit) {
        this->collider.base.atFlags &= ~AT_HIT;
    }
    func_80926394(this, play);
    if (this->timer > 0) {
        this->timer--;
    }
    if ((this->actor.bgCheckFlags & (BGCHECKFLAG_GROUND | BGCHECKFLAG_GROUND_TOUCH | BGCHECKFLAG_WALL)) || atHit ||
        (this->timer <= 0)) {
        ObjKibako_AirBreak(this, play);
        ObjKibako_SpawnCollectible(this, play);
        SfxSource_PlaySfxAtFixedWorldPos(play, &this->actor.world.pos, 20, NA_SE_EV_WOODBOX_BREAK);
        Actor_Kill(&this->actor);
    } else {
        if (this->actor.bgCheckFlags & BGCHECKFLAG_WATER_TOUCH) {
            ObjKibako_WaterBreak(this, play);
            ObjKibako_SpawnCollectible(this, play);
            SfxSource_PlaySfxAtFixedWorldPos(play, &this->actor.world.pos, 20, NA_SE_EV_WOODBOX_BREAK);
            SfxSource_PlaySfxAtFixedWorldPos(play, &this->actor.world.pos, 40, NA_SE_EV_DIVE_INTO_WATER_L);
            Actor_Kill(&this->actor);
        } else {
            if (this->actor.velocity.y < -0.05f) {
                this->actor.gravity = -2.3f;
            }
            Actor_MoveWithGravity(&this->actor);
            Math_StepToS(&D_80927384, 0, 0xA0);
            Math_StepToS(&D_8092738C, D_80927388, 0xA0);
            this->actor.shape.rot.x = (s16)(this->actor.shape.rot.x + D_80927384);
            this->actor.shape.rot.y = (s16)(this->actor.shape.rot.y + D_8092738C);
            Actor_UpdateBgCheckInfo(play, &this->actor, 18.0f, 15.0f, 0.0f, UPDBGCHECKINFO_FLAG_WALL | UPDBGCHECKINFO_FLAG_FLOOR | UPDBGCHECKINFO_FLAG_MM_40);
            Collider_UpdateCylinder(&this->actor, &this->collider);
            CollisionCheck_SetOC(play, &play->colChkCtx, &this->collider.base);
            CollisionCheck_SetAT(play, &play->colChkCtx, &this->collider.base);
        }
    }
}

void ObjKibako_Update(Actor_ObjKibako* this, GameState_Play* play)
{
    this->actionFunc(this, play);
    ObjKibako_SetShadow(this);
}

void ObjKibako_Draw(Actor_ObjKibako* this, GameState_Play* play)
{
    Gfx_DrawDListOpa(play, sDisplayLists[KIBAKO_BANK_INDEX(this)]);
}

ActorInit Obj_Kibako_InitVars = {
    AC_OBJ_KIBAKO,
    ACTORCAT_PROP,
    FLAGS,
    OBJECT_GAMEPLAY_KEEP,
    sizeof(Actor_ObjKibako),
    (ActorFunc)ObjKibako_Init,
    (ActorFunc)ObjKibako_Destroy,
    (ActorFunc)ObjKibako_Update,
    NULL,
};

OVL_ACTOR_INFO(AC_OBJ_KIBAKO, Obj_Kibako_InitVars);
