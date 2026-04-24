import { useRef, useMemo, useCallback, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

interface SkillNode {
  name: string;
  category: 'programming' | 'data' | 'cloud' | 'tools' | 'analytics';
  size: 'large' | 'medium' | 'small';
  description: string;
}

const SKILLS: SkillNode[] = [
  { name: 'Python', category: 'programming', size: 'large', description: 'Primary language for data engineering, ETL scripting, and PySpark jobs' },
  { name: 'SQL', category: 'programming', size: 'large', description: 'Expert in complex query optimization, indexing, and T-SQL' },
  { name: 'PySpark', category: 'data', size: 'large', description: 'Distributed data processing on Azure Databricks, 30% execution time reduction' },
  { name: 'Scala', category: 'programming', size: 'medium', description: 'Used for Spark performance-critical applications' },
  { name: 'Kafka', category: 'data', size: 'large', description: 'Real-time streaming with Azure Event Hubs, hours to minutes latency' },
  { name: 'ADF', category: 'cloud', size: 'large', description: 'Azure Data Factory pipelines processing 500K+ records daily' },
  { name: 'Databricks', category: 'cloud', size: 'large', description: 'Azure Databricks for PySpark batch jobs and Delta Lake' },
  { name: 'Fabric', category: 'cloud', size: 'large', description: 'Microsoft Fabric Lakehouse and Dataflows Gen2 for 150+ users' },
  { name: 'Snowflake', category: 'cloud', size: 'large', description: 'Cloud data warehousing with 40% storage cost reduction' },
  { name: 'dbt', category: 'data', size: 'medium', description: 'Data Build Tool for transformation automation, 95% automation rate' },
  { name: 'Delta Lake', category: 'data', size: 'medium', description: 'ACID transactions and time-travel on Azure data lakes' },
  { name: 'Airflow', category: 'data', size: 'medium', description: 'DAG-based workflow orchestration with SLA monitoring' },
  { name: 'Synapse', category: 'cloud', size: 'medium', description: 'Azure Synapse Analytics for Medallion Architecture' },
  { name: 'Power BI', category: 'analytics', size: 'large', description: 'PL-300 certified, self-service analytics for 150+ users' },
  { name: 'Terraform', category: 'tools', size: 'medium', description: 'Infrastructure as Code for Azure environments' },
  { name: 'Docker', category: 'tools', size: 'medium', description: 'Containerized pipeline deployments on Azure DevOps' },
  { name: 'ADLS Gen2', category: 'cloud', size: 'medium', description: 'Azure Data Lake Storage for Bronze/Silver/Gold layers' },
  { name: 'PostgreSQL', category: 'programming', size: 'medium', description: 'Relational database optimization and schema design' },
  { name: 'scikit-learn', category: 'analytics', size: 'small', description: 'ML models for churn prediction, 82% accuracy' },
  { name: 'GDPR', category: 'tools', size: 'small', description: 'PII masking, RBAC, CCPA compliance governance' },
];

const CATEGORY_COLORS: Record<string, { day: string; night: string }> = {
  programming: { day: '#c9a84c', night: '#4A90D9' },
  data: { day: '#e8d48b', night: '#6B8DD6' },
  cloud: { day: '#c9a84c', night: '#8FA8E8' },
  tools: { day: '#e8d48b', night: '#A5B8F0' },
  analytics: { day: '#c9a84c', night: '#B8C8F5' },
};

const SIZE_RADIUS: Record<string, number> = {
  large: 0.5,
  medium: 0.35,
  small: 0.22,
};

const CONNECTIONS: [number, number][] = [
  [0, 3], [3, 4], [4, 8], [8, 9], [1, 13], [0, 2], [3, 17], [4, 6], [7, 10], [7, 11], [14, 0], [15, 16], [5, 3], [12, 11],
];

interface OrbitingNodeProps {
  skill: SkillNode;
  index: number;
  dayNightProgress: React.MutableRefObject<number>;
  mousePos: React.MutableRefObject<THREE.Vector3 | null>;
  onNodeClick: (skill: SkillNode, position: THREE.Vector3) => void;
}

function OrbitingNode({ skill, index, dayNightProgress, mousePos, onNodeClick }: OrbitingNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const labelRef = useRef<THREE.Mesh>(null);

  const orbitRadius = 4 + (index % 3) * 2.5;
  const orbitSpeed = 0.15 + (index % 5) * 0.08;
  const orbitPhase = (index / SKILLS.length) * Math.PI * 2;
  const orbitTilt = ((index % 3) - 1) * 0.3;

  const pos = useRef(new THREE.Vector3());
  const velocity = useRef(new THREE.Vector3());
  const orbitAnchor = useRef(new THREE.Vector3());
  const scaleTarget = useRef(1);

  const radius = SIZE_RADIUS[skill.size];
  const baseColor = useMemo(() => {
    const colors = CATEGORY_COLORS[skill.category] || CATEGORY_COLORS.programming;
    return { day: new THREE.Color(colors.day), night: new THREE.Color(colors.night) };
  }, [skill.category]);

  const handlePointerOver = useCallback(() => {
    scaleTarget.current = 1.4;
    document.body.style.cursor = 'pointer';
  }, []);

  const handlePointerOut = useCallback(() => {
    scaleTarget.current = 1;
    document.body.style.cursor = 'none';
  }, []);

  const handleClick = useCallback((e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    onNodeClick(skill, pos.current.clone());
  }, [skill, onNodeClick]);

  useFrame(({ clock, camera }, delta) => {
    if (!meshRef.current || !groupRef.current) return;
    const t = clock.getElapsedTime();
    const dn = Math.max(0, Math.min(1, dayNightProgress.current));

    const angle = t * orbitSpeed + orbitPhase;
    const anchorX = Math.cos(angle) * orbitRadius;
    const anchorY = Math.sin(orbitTilt) * Math.sin(angle * 0.7) * 2;
    const anchorZ = Math.sin(angle) * orbitRadius * 0.6;
    orbitAnchor.current.set(anchorX, anchorY, anchorZ);

    let gravityForce = new THREE.Vector3();
    if (mousePos.current) {
      const toMouse = mousePos.current.clone().sub(pos.current);
      const dist = toMouse.length();
      if (dist < 6 && dist > 0.1) {
        const strength = 0.008 * (1 - dist / 6);
        gravityForce = toMouse.normalize().multiplyScalar(strength);
      }
    }

    const displacement = pos.current.clone().sub(orbitAnchor.current);
    const springForce = displacement.clone().multiplyScalar(-0.02);
    const toCenter = orbitAnchor.current.clone().negate();
    const centripetalForce = toCenter.normalize().multiplyScalar(0.001);

    velocity.current.add(gravityForce);
    velocity.current.add(springForce);
    velocity.current.add(centripetalForce);
    velocity.current.multiplyScalar(0.97);

    pos.current.add(velocity.current);

    const currentScale = meshRef.current.scale.x;
    const newScale = currentScale + (scaleTarget.current - currentScale) * 0.1;
    meshRef.current.scale.setScalar(newScale);
    if (labelRef.current) {
      labelRef.current.scale.setScalar(newScale * 0.8);
    }

    meshRef.current.position.copy(pos.current);
    if (labelRef.current) {
      labelRef.current.position.copy(pos.current).add(new THREE.Vector3(0, radius + 0.15, 0));
      labelRef.current.lookAt(camera.position);
    }

    const material = meshRef.current.material as THREE.MeshPhongMaterial;
    const targetColor = baseColor.day.clone().lerp(baseColor.night, dn);
    material.color.lerp(targetColor, 0.05);
    material.emissive.lerp(targetColor.clone().multiplyScalar(0.3), 0.05);

    meshRef.current.rotation.y += delta * 0.5;
    meshRef.current.rotation.x += delta * 0.3;
  });

  const color = baseColor.day;

  return (
    <group ref={groupRef}>
      <mesh
        ref={meshRef}
        position={[Math.cos(orbitPhase) * orbitRadius, 0, Math.sin(orbitPhase) * orbitRadius * 0.6]}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      >
        <sphereGeometry args={[radius, 32, 32]} />
        <meshPhongMaterial
          color={color}
          emissive={color.clone().multiplyScalar(0.3)}
          shininess={80}
          transparent
          opacity={0.9}
        />
      </mesh>
      <Text
        ref={labelRef as any}
        position={[Math.cos(orbitPhase) * orbitRadius, radius + 0.15, Math.sin(orbitPhase) * orbitRadius * 0.6]}
        fontSize={0.18}
        color={dayNightProgress.current > 0.5 ? '#E8E8FF' : '#FFF8F0'}
        anchorX="center"
        anchorY="bottom"
      >
        {skill.name}
      </Text>
    </group>
  );
}

function ConstellationLines({ dayNightProgress }: { dayNightProgress: React.MutableRefObject<number> }) {
  const lineRef = useRef<THREE.LineSegments>(null);
  const positionsRef = useRef<Float32Array>(new Float32Array(CONNECTIONS.length * 6));

  useFrame(() => {
    if (!lineRef.current) return;
    const dn = Math.max(0, Math.min(1, dayNightProgress.current));
    const opacity = Math.max(0, (dn - 0.3) * 2);
    const material = lineRef.current.material as THREE.LineBasicMaterial;
    material.opacity = opacity * 0.4;
  });

  return (
    <lineSegments ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positionsRef.current, 3]}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#4A90D9" transparent opacity={0} />
    </lineSegments>
  );
}

function ParticleBurst({ position, color }: { position: THREE.Vector3; color: string }) {
  const particlesRef = useRef<THREE.Points>(null);
  const velocities = useRef<THREE.Vector3[]>([]);
  const startTime = useRef(Date.now());
  const particleCount = 25;

  useMemo(() => {
    velocities.current = [];
    for (let i = 0; i < particleCount; i++) {
      velocities.current.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 4,
          (Math.random() - 0.5) * 4 + 2,
          (Math.random() - 0.5) * 4
        )
      );
    }
  }, []);

  useFrame(() => {
    if (!particlesRef.current) return;
    const elapsed = (Date.now() - startTime.current) / 1000;
    if (elapsed > 1.2) {
      particlesRef.current.visible = false;
      return;
    }

    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] += velocities.current[i].x * 0.016;
      positions[i * 3 + 1] += velocities.current[i].y * 0.016;
      positions[i * 3 + 2] += velocities.current[i].z * 0.016;
      velocities.current[i].y -= 0.05;
      velocities.current[i].multiplyScalar(0.98);
    }
    particlesRef.current.geometry.attributes.position.needsUpdate = true;

    const material = particlesRef.current.material as THREE.PointsMaterial;
    material.opacity = Math.max(0, 1 - elapsed);
  });

  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = position.x;
    positions[i * 3 + 1] = position.y;
    positions[i * 3 + 2] = position.z;
  }

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color={color} size={0.1} transparent opacity={1} />
    </points>
  );
}

function SceneContent({ dayNightProgress }: { dayNightProgress: React.MutableRefObject<number> }) {
  const { camera, pointer } = useThree();
  const mousePos = useRef<THREE.Vector3 | null>(null);
  const [selectedNode, setSelectedNode] = useState<{ skill: SkillNode; position: THREE.Vector3 } | null>(null);

  useFrame(() => {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(pointer.x, pointer.y);
    raycaster.setFromCamera(mouse, camera);
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const intersectPoint = new THREE.Vector3();
    raycaster.ray.intersectPlane(plane, intersectPoint);
    if (intersectPoint) {
      mousePos.current = intersectPoint;
    }
  });

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    camera.position.x = Math.sin(t * 0.05) * 2;
    camera.position.y = Math.sin(t * 0.03) * 0.5;
    camera.lookAt(0, 0, 0);
  });

  const handleNodeClick = useCallback((skill: SkillNode, position: THREE.Vector3) => {
    setSelectedNode({ skill, position });
    setTimeout(() => setSelectedNode(null), 1500);
  }, []);

  const dn = dayNightProgress.current;
  const ambientIntensity = 0.4 + dn * 0.2;
  const pointColor = dn > 0.5 ? '#4A90D9' : '#c9a84c';

  return (
    <>
      <ambientLight intensity={ambientIntensity} />
      <pointLight position={[0, 0, 0]} intensity={1.0} color={pointColor} distance={20} />
      <pointLight position={[10, 5, 5]} intensity={0.3} color="#ffffff" />

      {SKILLS.map((skill, i) => (
        <OrbitingNode
          key={skill.name}
          skill={skill}
          index={i}
          dayNightProgress={dayNightProgress}
          mousePos={mousePos}
          onNodeClick={handleNodeClick}
        />
      ))}

      <ConstellationLines dayNightProgress={dayNightProgress} />

      {selectedNode && (
        <>
          <ParticleBurst
            position={selectedNode.position}
            color={CATEGORY_COLORS[selectedNode.skill.category]?.day || '#c9a84c'}
          />
          <Text
            position={[selectedNode.position.x, selectedNode.position.y + 1, selectedNode.position.z]}
            fontSize={0.2}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            maxWidth={4}
          >
            {selectedNode.skill.description}
          </Text>
        </>
      )}
    </>
  );
}

export default function GravityScene({ dayNightProgress }: { dayNightProgress: React.MutableRefObject<number> }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const bgTop = dayNightProgress.current > 0.5 ? '#050508' : '#080808';
  const bgBottom = dayNightProgress.current > 0.5 ? '#020204' : '#000000';
  const bgGradient = 'linear-gradient(180deg, ' + bgTop + ' 0%, ' + bgBottom + ' 100%)';

  return (
    <div
      ref={containerRef}
      className="gravity-canvas"
      style={{
        width: '100%',
        height: '80vh',
        minHeight: '500px',
        background: bgGradient,
        position: 'relative',
        transition: 'background 0.8s ease',
      }}
    >
      {isVisible && (
        <Canvas
          camera={{ position: [0, 0, 14], fov: 60 }}
          gl={{ antialias: true, alpha: true }}
          style={{ width: '100%', height: '100%' }}
        >
          <SceneContent dayNightProgress={dayNightProgress} />
        </Canvas>
      )}

      <div
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: dayNightProgress.current > 0.5 ? 'rgba(200,200,255,0.3)' : 'rgba(201,168,76,0.4)',
          textAlign: 'center',
          pointerEvents: 'none',
        }}
      >
        Move cursor to attract nodes - Click to explore
      </div>
    </div>
  );
}
